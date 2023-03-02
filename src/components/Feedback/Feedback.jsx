import React, {useState} from "react";
import "./Feedback.module.css";
import Section from "./Section/Section";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Statistics from "./Statistics/Statistics";
import Notification from "./Notification/Notification";


export default function Feedback () {

    const [ good, setGood ] = useState(0);
    const [ neutral, setNeutral ] = useState(0);
    const [ bad, setBad ] = useState(0);

    const options = [ 'good', 'neutral', 'bad' ];

    const clickFeedback = event => {
        const name = event.target.name;
        
        switch(name) {
            case 'good' : 
              setGood(prevState => prevState + 1);
            break;

            case 'neutral':
                setNeutral(prevState => prevState + 1);
            break;

            case 'bad': 
                setBad(prevState => prevState + 1);
            break;

            default:
                return;
        };   
    };

    const countTotalFeedback = () => {
        const values = Object.values({good, neutral, bad})
        
        const total = values.reduce((total, value) => {
            return total + value;
        }, 0);
        
        return total;
    };

    const countPositiveFeedbackPercentage = () => {
        const result = Math.round(((good + neutral) / countTotalFeedback()) * 100);
        return result;
    };


    return (
        <>
            <Section title={'Please leave feedback'}>
              
              <FeedbackOptions
              options={options}
              onLeaveFeedback={clickFeedback}
              />
              </Section>

              <Section title={'Statistics'}>
              {!countTotalFeedback() ? <Notification message={'No feedback given'}/> :<Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
                />
               }
            </Section>
        </>
    );
};





// class OldFeedback extends Component {

//     state = {
//         good: 0,
//         neutral: 0,
//         bad: 0
//     };


//     clickFeedback = (event) => {
//         const name = event.target.name;
//         this.setState((prevState) => ({
//             [name]: prevState[name] + 1,
//         }))
//     };

//     countTotalFeedback = () => {
//         const values = Object.values(this.state)

//         const total = values.reduce((total, value) => {
//          return total + value;
//         }, 0);

//         return total;
//     };

//     countPositiveFeedbackPercentage = () => {
//         const result = Math.round(((this.state.good + this.state.neutral) / this.countTotalFeedback()) * 100);
//         return result;
//     };

//     render () {
//         const { good, neutral, bad } = this.state;
//         const total = this.countTotalFeedback();
//         const percentage = this.countPositiveFeedbackPercentage();
//         const clickFeedback = this.clickFeedback;

//         const objKey = Object.keys(this.state)


//         return (
//             <div>
//                 <Section title={'Please leave feedback'}>
              
//                 <FeedbackOptions
//                 options={objKey}
//                 onLeaveFeedback={clickFeedback}
//                 />
//                 </Section>

//                 <Section title={'Statistics'}>
//                 {!this.countTotalFeedback() ? <Notification message={'No feedback given'}/> : <Statistics
//                   good={good}
//                   neutral={neutral}
//                   bad={bad}
//                   total={total}
//                   positivePercentage={percentage}
//                   />
//                 }
//                 </Section>
//             </div>
//         );
//     };
// };

// export default OldFeedback;