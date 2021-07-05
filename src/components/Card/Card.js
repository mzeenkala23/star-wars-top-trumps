import React from "react";

import { CardFeatureList } from "./CardFeatureList";

export const Card = ({ card, isClosed, featureSelect, selectedFeature }) => {
  const { name, starshipClass } = card;
  return (
    <div className="card">
      {isClosed ? null : (
        <>
          <h1 className="title">{name}</h1>
          <span>{starshipClass}</span>
          <CardFeatureList
            selectedFeature={selectedFeature}
            featureSelect={featureSelect}
            cardFeatures={card}
          />
        </>
      )}
    </div>
  );
};
