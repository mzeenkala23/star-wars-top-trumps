import React from "react";

import { starshipFeatures } from "../../constants";
import { CardFeatureItem } from "./CardFeatureItem";

export const CardFeatureList = ({
  cardFeatures,
  featureSelect,
  selectedFeature,
}) => {
  const renderFeatureList = Object.keys(starshipFeatures).map(
    (starshipFeature) => {
      let feature;
      if (starshipFeature === "filmConnection") {
        feature = cardFeatures[starshipFeature].length;
      }
      feature = cardFeatures[starshipFeature];
      return (
        <CardFeatureItem
          key={`${starshipFeatures[starshipFeature]}-feature`}
          itemFeature={
            (feature === null) | (feature === undefined) ? "N/A" : feature
          }
          featureId={starshipFeature}
          selectedFeature={selectedFeature}
          label={starshipFeatures[starshipFeature]}
          pickFeature={featureSelect}
        />
      );
    }
  );

  return (
    <div className="features">
      <ul>{renderFeatureList}</ul>
    </div>
  );
};
