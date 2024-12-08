import StyleFour from "./StyleFour";
import Hazelnut from "../../assets/hazelnut.jpg";
import Almond from "../../assets/almond.jpg";

function StyleFourProduct() {
  return (
    <div>
      <div className="one-header">
        <h1>Style 4</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore lacus vel facilisis.
        </p>
      </div>
      <div className="custom-container">
        <div className="d-flex">
          <StyleFour
            image={Hazelnut}
            rating="★★★★★"
            ratingtext="(5.0)"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel culpa autem magnam vitae fugiat maxime alias veniam repudiandae facilis suscipit molestias, hic, ratione incidunt delectus deserunt consequatur! Eos, quae maiores."
            name="Hazel nut pack 200gm"
            discountprice="$145"
            price="$150"
          />
          <StyleFour
            image={Almond}
            rating="★★★★★"
            ratingtext="(5.0)"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel culpa autem magnam vitae fugiat maxime alias veniam repudiandae facilis suscipit molestias, hic, ratione incidunt delectus deserunt consequatur! Eos, quae maiores."
            name="Sweet crunchy nut 250gm pack"
            discountprice="$120.25"
            price="$123.25"
          />
        </div>
      </div>
    </div>
  );
}

export default StyleFourProduct;