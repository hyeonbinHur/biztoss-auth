import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer--container">
        <div className="footer--policy">
          이용약관 <span className="footer--policy__2"> 개인정보 처리방침</span>
        </div>

        <p className="footer--site-name">비즈토스</p>

        <p className="footer--company-name">이숲컴퍼니</p>

        <ul className="footer--company-ul">
          <li>서울 특별시 관악구 호암로 24길 6</li>
          <li>설립일 : 2024.03.11</li>
          <li>대표 : 이상철</li>
          <li>사업자등록증번호 : 573-05-02836</li>
          <li>통신판매신고번호 : 2024-서울관악-1651</li>
          <li>고객센터 : 070-8065-0953</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
