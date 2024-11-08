import React from "react";

const QuestionCard = ({ faq }) => {
  return (
    <div className="bg-white p-5 my-5 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-2">{faq?.question}</h2>
      <p className="text-sm">{faq?.answer}</p>
    </div>
  );
};

export default QuestionCard;
