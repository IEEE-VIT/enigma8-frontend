import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Story.styles.css";
import { getFullStory } from "../../api/story";
import { allRooms } from "../../api/room";
import { getUser } from "../../api/user";
import StoryMenu from "../../components/Menu/StoryMenu/StoryMenu.component";

const Story = () => {
  const [unlocked, setUnlocked] = useState(0);
  const [ispreGame, setIsPreGame] = useState(false);
  const [currentroomNo, setCurrentroomNo] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [nextRoomId, setNextRoomId] = useState("");
  const [nextRoomNo, setNextRoomNo] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [story, setStory] = useState([]);
  const history = useHistory();
  const handleReturn = () => {
    history.push("/rooms");
  };
  const handleChange = (room) => {
    setCurrentroomNo(room);
  };
  useEffect(() => {
    getUser().then((res) => {
      const redirectRoomId = res.data.data.currentRoomId;
      // if (redirectRoomId === undefined) console.log("its undefined");
      if (redirectRoomId !== undefined) {
        setIsPreGame(true);
        setNextRoomId(redirectRoomId);
        allRooms()
          .then((resp) => {
            const info = resp.data.data.data;
            setTotalRooms(info.length);
            for (let i = 0; i < info.length; i += 1) {
              if (info[i].journey.powerupSet === "yes") {
                setUnlocked(Number(info[i].room.roomNo));
                setCurrentroomNo(Number(info[i].room.roomNo));
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
        getFullStory()
          .then((response) => {
            const storydata = response.data.data.story;
            setStory(storydata);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);
  const storyList = story.filter((chat) => {
    const selectedRoomNo = Number(chat.roomNo);
    if (currentroomNo === selectedRoomNo) {
      return true;
    }
    return false;
  });
  const speakerFinder = (data) => {
    // if (data.sender.includes("Jones")) return true;
    console.log(data);
    return false;
  };
  const chatList = storyList.map((message, i) => {
    console.log(message);
    return (
      <div className={`story-chat-${i}`}>
        <div
          className={`${
            speakerFinder(message)
              ? "story-speaker-1-name"
              : "story-speaker-2-name"
          } story-speaker`}
        >
          {speakerFinder(message) ? "JONES" : "ALI"}
        </div>
        <div
          className={`${
            speakerFinder() ? "story-speaker-1-" : "story-speaker-2-name"
          } story-speaker`}
        >
          {message.message}
        </div>
      </div>
    );
  });
  const handleContinue = () => {
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
  const PreGame = () => {
    console.log("pregame");
    return <div className="pregame-text">Please start the game first </div>;
  };
  const PostGame = () => {
    return (
      <div>
        <div className="story-back-btn">
          <button type="button" onClick={handleReturn}>
            Back
          </button>
        </div>
        <div className="story-menu">
          <StoryMenu
            count={totalRooms}
            unlocked={unlocked}
            showRoom={currentroomNo}
            triggerFunction={handleChange}
          />
        </div>
        <div className="story-content">{chatList}</div>
        <button
          type="button"
          className="story-continue-btn"
          onClick={handleContinue}
        >
          {currentroomNo === unlocked
            ? "Keep playing to unlock more"
            : "Continue reading"}
        </button>
      </div>
    );
  };
  console.log("r u runnninggggg!", ispreGame);
  return (
    <div
      className="story-container"
      // style={{ height: ispreGame ? "100%" : "90vh" }}
    >
      {!ispreGame ? PreGame() : PostGame()}
    </div>
  );
};

export default Story;
