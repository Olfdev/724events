import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    const nextIndex = index < byDateDesc.length - 1 ? index + 1 : 0;
    setIndex(nextIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextCard();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  });

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, idx) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => handleRadioChange(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;