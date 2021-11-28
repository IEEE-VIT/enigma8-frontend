import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Story.styles.css";
import { getFullStory } from "../../api/story";
import { allRooms } from "../../api/room";
import { getUser } from "../../api/user";
import StoryMenu from "../../components/Menu/StoryMenu/StoryMenu.component";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";
import Loader from "../../components/Loader/Loader.component";

const Story = () => {
  // type 1 - game not started
  const [preGame, setPreGame] = useState(false);
  // type 2 - Room 1: before meeting characters
  const [isFirstRoom, setIsFirstRoom] = useState(false);
  // type 3 - Room 1: after meeting characters
  const [metCharacters, setMetCharacters] = useState(false);
  // type 4 - Other rooms

  // for internal navigation and dropdown
  const [totalRooms, setTotalRooms] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [currentroomNo, setCurrentroomNo] = useState(-1);
  // const [currentroomId, setCurrentroomId] = useState("");
  // next room not unlocked
  const [isSolved, setIsSolved] = useState(true);
  // for question route
  const [nextRoomId, setNextRoomId] = useState("");
  const [nextRoomNo, setNextRoomNo] = useState(0);

  const [story, setStory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // currentRoomId - to know which room to show
    getUser()
      .then((res) => {
        const redirectRoomId = res.data.data.currentRoomId;
        // Setting PREGAME
        if (redirectRoomId === undefined) setPreGame(true);
        setNextRoomId(redirectRoomId);
        // for dropdown menu :
        // total rooms
        // upto how many are unlocked (for disabling)
        //
        allRooms()
          .then((resp) => {
            const info = resp.data.data.data;
            setTotalRooms(info.length);
            for (let i = 0; i < info.length; i += 1) {
              if (info[i].journey.powerupSet === "yes") {
                setUnlocked(Number(info[i].room.roomNo));
                setCurrentroomNo(Number(info[i].room.roomNo));

                // Setting ISFIRSTROOM
                if (
                  Number(info[i].room.roomNo) === 1 &&
                  info[i].room._id === redirectRoomId
                ) {
                  setIsFirstRoom(true);
                }
              }
              if (redirectRoomId === info[i].room._id) {
                const statusList = info[i].journey.questionsStatus;
                const solvedCount = statusList.filter(
                  (status) => status === "solved"
                ).length;
                if (solvedCount === 3) setIsSolved(true);
                setNextRoomNo(Number(info[i].room.roomNo));
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        getFullStory()
          .then((response) => {
            const storydata = response.data.data.story;
            setStory(storydata);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Filter story based on room
  const filteredStory = story.filter((chat) => {
    const selectedRoomNo = Number(chat.roomNo);
    if (currentroomNo === 1 && !metCharacters) return selectedRoomNo === 0;
    return currentroomNo === selectedRoomNo;
  });

  // Drop down - change rooms
  const handleChange = (room) => {
    if (room === 1) {
      setMetCharacters(false);
      setIsFirstRoom(true);
    }
    setCurrentroomNo(room);
  };

  // Continue button
  const handleContinue = () => {
    // internal redirecting
    if (currentroomNo < unlocked) {
      setCurrentroomNo(currentroomNo + 1);
    } else if (isSolved) {
      history.push({ pathname: "/rooms" });
    } else {
      history.push({
        pathname: "/question",
        state: { roomNo: nextRoomNo, roomId: nextRoomId },
      });
    }
  };
  const handleClick = () => {
    setMetCharacters(true);
  };

  const PreGameContainer = () => (
    <div className="pregame-container">
      <div className="pregame-text">Please start the game first </div>
    </div>
  );

  // Distribute story content
  const Character = filteredStory.map((message, i) => {
    return (
      <div className={`story-character story-character-${i + 1}`}>
        <div
          className={`story-character-sender story-character-sender-${i + 1}`}
        >
          {message.sender}
        </div>
        <div
          className={`story-character-message story-character-message-${i + 1}`}
        >
          {message.message}
        </div>
      </div>
    );
  });

  const RoomZeroContainer = () => (
    <div className="roomzero-container">
      <div className="roomzero-content">{Character}</div>
      {/* <button
        type="button"
        className="story-roomzero-btn"
        onClick={() => setMetCharacters(true)}
      >
        Continue Reading
      </button> */}
      <GoldenBtn marginTop="0px" width="200px" triggerFunction={handleClick}>
        Continue Reading
      </GoldenBtn>
    </div>
  );

  // Distribute story content
  const ChatBox = filteredStory.map((message, i) => {
    return (
      <div className={`story-chatbox story-chatbox-${i % 2}`}>
        <div className={`story-chatbox-sender story-chatbox-sender-${i % 2}`}>
          {message.sender}
        </div>
        <div className={`story-chatbox-message story-chatbox-message-${i % 2}`}>
          {message.message}
        </div>
      </div>
    );
  });

  const ChatBoxContainer = () => (
    <div className="chatbox-container">
      <StoryMenu
        count={totalRooms}
        unlocked={unlocked}
        showRoom={currentroomNo}
        triggerFunction={handleChange}
        className="story-menu"
      />
      <div className="chatbox-content">{ChatBox}</div>
      {/* <button
        type="button"
        className="story-continue-btn"
        onClick={handleContinue}
      >
        {currentroomNo === unlocked
          ? "Keep playing to unlock more"
          : "Continue reading"}
      </button> */}
      {currentroomNo === unlocked ? (
        <GoldenBtn
          marginTop="24px"
          width="280px"
          triggerFunction={handleContinue}
        >
          Keep playing to unlock more
        </GoldenBtn>
      ) : (
        <GoldenBtn
          marginTop="24px"
          width="200px"
          triggerFunction={handleContinue}
        >
          Continue Reading
        </GoldenBtn>
      )}
    </div>
  );

  const decideContent = () => {
    if (preGame) return PreGameContainer();
    if (isFirstRoom && !metCharacters) {
      return RoomZeroContainer();
    }
    return ChatBoxContainer();
  };
  const decideClass = () => {
    if (preGame) return 1;
    if (isFirstRoom && !metCharacters) {
      return 2;
    }
    return 3;
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={`story-container story-container-${decideClass()}`}>
      {decideContent()}
    </div>
  );
};

export default Story;
