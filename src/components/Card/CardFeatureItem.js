import React from "react";

export const CardFeatureItem = ({
  itemFeature,
  label,
  pickFeature,
  selectedFeature,
  featureId,
}) => {
  return (
    <li
      className={`ship-attribute ${
        selectedFeature === featureId ? "selected" : ""
      }`}
      onClick={() => pickFeature(featureId)}
    >
      {label} <span>{itemFeature}</span>
    </li>
  );
};
