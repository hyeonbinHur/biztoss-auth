import Image from "next/image";
import TestDashboard from "@/component/TestDashBoard";
import Hot from "@/public/biztoss-hot.png";
import Secion7_1 from "@/public/section-7_1.jpg";
import Secion7_2 from "@/public/section-7_2.jpg";
import Secion7_3 from "@/public/section-7_3.jpg";
import Secion7_4 from "@/public/section-7_4.jpg";
import Secion7_5 from "@/public/section-7_5.jpg";

export default function Home() {
  return (
    <div>
      <section className="section--1">
        <h1 className="section--1__title">새로운 비즈니스를 시작하세요</h1>
        <span className="section--1__sub-title">
          비즈토스에선 매물을 꼼꼼히 살펴보고 선택할 수 있어요
        </span>

        <span className="section--1__span">
          스마트스토어, &nbsp;자사몰, &nbsp;앱서비스&nbsp;&nbsp;
          <strong>온라인 사업 거래 플랫폼.</strong>
        </span>

        <span className="section--1__span">
          <strong>믿을 수 있는 비즈토스</strong>
        </span>
        <button className="section--1__btn btn">매물 무료로 등록하기</button>
      </section>

      <section className="section--2">
        <p className="section--2__btn__1">인수매각 절차 안내</p>

        <h4 className="section--2__title">
          인기 급상승 매물 <img src={Hot.src} className="section--2__hot"></img>
        </h4>

        <div className="section--2__gallery"></div>
        <button className="section--2__btn__2">더 많은 매물 둘러보기</button>
      </section>

      <section className="section--3">
        <p className="section--3__title">
          매출지표와 미래 사업성까지, 이제 꼼꼼하게 살펴보세요
        </p>

        <span className="section--3__sub-title">
          <strong>친절하고 구체적인 제안서</strong>들을 통해
          <br /> 당신이 바라던 비즈니스를 선택해요.
        </span>

        <div className="section--3__img"></div>
      </section>

      <section className="section--4">
        <div className="section--4__img"></div>

        <div className="section--4__text-container">
          <p className="section--4--text__1">
            비즈토스 매니저의 1:1 매니지먼트
          </p>

          <p className="section--4--text__2">
            <strong>매물등록부터 계약성사</strong>까지
            <br />
            <strong>비즈토스 매니저의 섬세한 검토</strong>를
            <br />
            통해 이뤄져요.
          </p>
        </div>
      </section>

      <section className="section--5">
        <div className="section--5--text__container">
          <p className="section--5--text__1">비즈토스의 스마트 분석 시스템</p>
          <span className="section--5--text__2">
            <strong>
              허위정보 분석 AI와 빅데이터 기반 <br />
              가격산정
            </strong>
            으로 현명한 거래를 보장해요.
          </span>
        </div>
        <div className="section--5--gallery"></div>
      </section>

      <section className="section--6">
        <div className="section--6--gallery"></div>
        <div className="section--6--text__container">
          <p className="section--6--text__1">비즈토스의 파격제안</p>
          <p className="section--6--text__2">
            <strong>비즈니스 등록절차가 무료</strong>예요.
            <br />
            <strong>부담없이 비즈니스를 홍보</strong>해보세요!
          </p>
        </div>
      </section>

      <section className="section--7">
        <span className="section--7--text">
          <strong>
            🪄 공식 인스타그램을 통해 비즈토스의 각종 이벤트 확인하기🪄
          </strong>
        </span>

        <div className="section--7--gallery">
          <img
            className="section--7--gallery__item section--7--gallery__item__1"
            src={Secion7_1.src}
          />
          <img className="section--7--gallery__item" src={Secion7_2.src} />
          <img className="section--7--gallery__item" src={Secion7_3.src} />
          <img className="section--7--gallery__item" src={Secion7_4.src} />
          <img className="section--7--gallery__item" src={Secion7_5.src} />
        </div>
      </section>
    </div>
  );
}
