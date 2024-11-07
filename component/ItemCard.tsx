import React from "react";

interface Item {
  id: number;
  title: string;
  image: string;
  monthlyProfit: string;
  price: string;
  biztossVerify: boolean;
  application: boolean;
  shoppingmall: boolean;
  like: number;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="item-card">
      <img className="item-card__image" src={item.image} alt={item.title} />
      <h2 className="item-card__title">{item.title}</h2>
      <div className="item-card__info">
        <div className="item-card__info__monthly-profit">
          <span>월 순이익</span>
          <span>{item.monthlyProfit}</span>
        </div>
        <div className="item-card__info__price">
          <span>희망 매각가</span>
          <span>{item.price}</span>
        </div>
      </div>
      <div className="item-card__tags">
        {item.biztossVerify && (
          <span className="item-card__tag--verified">비즈토스 검증</span>
        )}
        {item.application && (
          <span className="item-card__tag--application">어플리케이션</span>
        )}
      </div>
      <div className="item-card__footer">
        <span className="item-card__like">❤️ {item.like}</span>
        <span className="item-card__cart">🛒</span>
      </div>
    </div>
  );
};

export default ItemCard;
