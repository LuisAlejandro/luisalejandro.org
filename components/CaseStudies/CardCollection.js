import React from "react";

import Card from "./Card";


const CardCollection = () => (
  <div className="article-collection">
    <Card cardMobile="w-11/12" cardCollection="mr-8 relative" />
    <Card
      cardMobile="w-11/12"
      cardBackground="article-card__background-image"
      cardCollection="mr-8 relative"
    />
    <Card cardMobile="w-11/12" cardCollection="mr-8 relative" />
    <Card cardMobile="w-11/12" cardCollection="mr-8 relative" />
    <Card
      cardMobile="w-11/12"
      cardBackground="article-card__background-image"
      cardCollection="mr-8 relative"
    />
    <Card cardMobile="w-11/12" cardCollection="mr-8 relative" />
  </div>
);


export default CardCollection;
