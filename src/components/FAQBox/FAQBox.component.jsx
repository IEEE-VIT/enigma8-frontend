import * as React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import "./FAQBox.styles.css";

const useStyles = makeStyles((theme) => ({
  field: {
    border: "1px solid #0fa3b1",
    fontSize: "1.5rem",
  },
  svg: {
    color: theme.palette.primary.main,
  },
  question: {
    color: theme.palette.primary.main,
    fontFamily: "Mulish",
    fontSize: "1.2rem",
  },
  answer: {
    color: theme.palette.contrast.main,
    fontSize: "1.1rem",
  },
}));

const FAQBox = (props) => {
  const classes = useStyles();
  const { index, question, answer } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(`panel${props.index + 1}`);
  };
  return (
    <div className="faq-box">
      <Accordion
        square="true"
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
        className={classes.field}
      >
        <AccordionSummary
          expandIcon={<ExpandMore className={classes.svg} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.question}>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.answer}>{answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
FAQBox.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
export default FAQBox;
