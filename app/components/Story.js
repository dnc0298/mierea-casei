import features from "../data/features";
import ProductStory from "./ProductStory";

function Story() {
  return (
    <div className="md:mt-15">
      {features.map((feature, index) => (
        <ProductStory
          key={feature.title}
          {...feature}
          imageSide={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}

export default Story;
