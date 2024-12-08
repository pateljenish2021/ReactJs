import Bag from "../../assets/shopping.svg";
import wishlist from "../../assets/wishlist.svg";
import View from "../../assets/view.svg";

const StyleFour = (props) => {
  const { image, description, rating, ratingtext, name, discountprice, price } =
    props;

  return (
    <>
      <div className="custom-container">
        <div className="row">
          <div className="four-card">
            <div className="d-flex">
              <div className="card-img"><img src={image} alt="product" /></div>
              <div className="card-data">
                <div className="card-name">{name}</div>
                <div className="card-desc">{description}</div>
                <div className="card-rating">{rating}<span>{ratingtext}</span></div>
                <div className="card-price">{discountprice}<span>{price}</span></div>
              </div>
            </div>
            <div className="card-btn">
              <div className="card-shopping-bag mb-2">
                <img src={Bag} alt="cart" className="shopping-bag" />
              </div>
              
                <div className="four-wishlist mb-2">
                  <img src={wishlist} alt="wishlist" />
                  </div>
                <div className="four-view">
                  <img src={View} alt="view" />
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default StyleFour;
