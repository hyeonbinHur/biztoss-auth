"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BusinessInfo {
  serviceType: string[];
  serviceName: string;
  websiteURL: string;
  monthlyRevenue: string;
  expectedPrice: string;
  negotiable: string;
}

interface OwnerInfo {
  sellUrgency: string;
  publicContact: string;
  privateContact: string;
}

interface BusinessDetails {
  promotionalTitle: string;
  businessDescription: string;
  businessRegistrationFile: File | null;
}

interface BuyerInteraction {
  ndaAgreement: boolean;
  noInfringement: boolean;
}

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/signin");
  }

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, []);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    serviceType: [],
    serviceName: "",
    websiteURL: "",
    monthlyRevenue: "",
    expectedPrice: "",
    negotiable: "",
  });
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({
    sellUrgency: "",
    publicContact: "",
    privateContact: "",
  });
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    promotionalTitle: "",
    businessDescription: "",
    businessRegistrationFile: null,
  });
  const [buyerInteraction, setBuyerInteraction] = useState<BuyerInteraction>({
    ndaAgreement: false,
    noInfringement: false,
  });
  const [solutionETC, setSolutionETC] = useState("");

  const handleBusinessInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "checkbox" && name === "serviceType") {
      setBusinessInfo((prevData) => ({
        ...prevData,
        serviceType: checked
          ? [...prevData.serviceType, value]
          : prevData.serviceType.filter((type) => type !== value),
      }));
    } else if (type === "file" && files) {
      setBusinessDetails((prevData) => ({
        ...prevData,
        businessRegistrationFile: files[0],
      }));
    } else {
      setBusinessInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOwnerInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBusinessDetailsChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBuyerInteractionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setBuyerInteraction((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const checkFormValidation = (data: any) => {
    if (data.business_info.serviceType.length === 0) {
      return false;
    } else if (data.business_info.serviceName === "") {
      return false;
    } else if (data.business_info.expectedPrice === "") {
      return false;
    } else if (data.business_info.negotiable === "") {
      return false;
    } else if (data.business_details.promotionalTitle === "") {
      return false;
    } else if (data.business_details.businessDescription === "") {
      return false;
    } else if (data.owner_info.sellUrgency === "") {
      return false;
    } else if (data.owner_info.publicContact === "") {
      return false;
    } else if (data.owner_info.privateContact === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const index = businessInfo.serviceType.indexOf("ETC");
    if (index !== -1) {
      businessInfo.serviceType[index] === solutionETC;
    }
    const outputData = {
      business_info: businessInfo,
      owner_info: ownerInfo,
      business_details: {
        ...businessDetails,
        business_registration: businessDetails.businessRegistrationFile
          ? businessDetails.businessRegistrationFile.name
          : null,
      },
      buyer_interaction: buyerInteraction,
    };
    if (!checkFormValidation(outputData)) {
      alert("필수 항목을 입력하여 주시기 바랍니다.");
    } else {
      console.log("Submitted Form Data:", JSON.stringify(outputData, null, 2));
    }
  };

  return (
    <main className="sale-form">
      <form className="form" onSubmit={handleSubmit}>
        <section className="form--section__1">
          <p className="section__1--text__1">지금 매물을 등록하세요</p>
          <p className="section__1--text__2">
            초기 매물 등록을 통해
            <span className="text--black">
              후속 Seller 분들보다 더욱 많은 게시글 노출 혜택
            </span>
            을 기대할 수 있어요 .
          </p>
        </section>

        <section className="form--section__2">
          <h3 className="form--section__2--title">비즈니스 매각 신청 폼</h3>
          <div className="form--section__2__1">
            <p className="section__2--text">
              <img
                className="section__2--img"
                src="https://cdn.imweb.me/upload/S2024081216df9632f5986/c17cc69357bb3.png"
                alt="매각 폼 작성 아이콘"
              />
              매물 등록 예상 소요시간 :
              <span className="text--blue">&nbsp; 5 ~ 10분</span>
            </p>
            <p className="section__2--text">
              <img
                className="section__2--img"
                src="https://cdn.imweb.me/upload/S2024081216df9632f5986/f0cf8c43a14d9.png"
                alt="매각 폼 시계 아이콘"
              />
              폼을 작성완료하면 대표님의 서비스가
              <span className="text--blue">&nbsp;[매물 둘러보기]&nbsp;</span> 에
              게시돼요.
            </p>
            <p className="section__2--text">
              <img
                className="section__2--img"
                src="https://cdn.imweb.me/upload/S2024081216df9632f5986/7cff3944c7db7.png"
                alt="매각 폼 보안 아이콘"
              />
              대표님께서 작성한 매물 정보는
              <span className="text--blue">비밀유지계약서 (NDA)&nbsp;</span> 를
              작성한 Buyer 분들에게만 공개돼요. 사업정보 유출에 대해 안심하셔도
              돼요.
            </p>
          </div>
        </section>

        <section className="form--section__3">
          <div className="div--1">
            <h3 className="div--1--title">
              대표님의 비즈니스 정보를 사실에 기반하여 작성해주세요.
            </h3>
            <p className="div--1--text">
              대표님께서는 비즈니스 매각을 어느정도 고려하고 계시나요?{" "}
              <span className="red-dot"></span>
            </p>

            <div className="div--1--radio-group">
              <input
                type="radio"
                id="later"
                name="sellUrgency"
                className="radio--input"
                onChange={handleOwnerInfoChange}
                value="false"
              />
              <label className="div--1--text radio--label" htmlFor="later">
                <span className="radio--btn"></span>
                추후 매각 고려중
              </label>
            </div>

            <div className="div--1--radio-group">
              <input
                type="radio"
                id="urgent"
                name="sellUrgency"
                className="radio--input"
                onChange={handleOwnerInfoChange}
                value="false"
              />
              <label className="div--1--text radio--label" htmlFor="urgent">
                <span className="radio--btn"></span>
                매각급함
              </label>
            </div>
          </div>

          <div className="div--2">
            <p>
              매각하시려는 서비스의 분야를 알려주세요.
              <span className="red-dot"></span>
            </p>

            <p>
              <input
                type="checkbox"
                id="shoppingmall"
                className="div--2__checkbox"
                name="serviceType"
                onChange={handleBusinessInfoChange}
                value="Shopping Mall"
              />
              <label htmlFor="shoppingmall" className="div--2__label">
                쇼핑몰 &nbsp;
                <span className="text--grey">
                  (자사몰, 스마트스토어, 쿠팡 등)
                </span>
              </label>
            </p>

            <p>
              <input
                type="checkbox"
                id="web"
                className="div--2__checkbox"
                name="serviceType"
                onChange={handleBusinessInfoChange}
                value="Web Service"
              />
              <label htmlFor="web" className="div--2__label">
                웹사이트&nbsp;
                <span className="text--grey">
                  (유튜브, 인스타 등 SNS 계정, 세금 계산기 사이트 등)
                </span>
              </label>
            </p>

            <p>
              <input
                type="checkbox"
                id="app"
                className="div--2__checkbox"
                name="serviceType"
                onChange={handleBusinessInfoChange}
                value="Application"
              />
              <label htmlFor="app" className="div--2__label">
                어플리케이션&nbsp;
                <span className="text--grey">(안드로이드, ios 등)</span>
              </label>
            </p>
            <p>
              <input
                type="checkbox"
                id="solution"
                className="div--2__checkbox"
                name="serviceType"
                onChange={handleBusinessInfoChange}
                value="Solution"
              />
              <label htmlFor="solution" className="div--2__label">
                솔루션&nbsp;
                <span className="text--grey">(SaaS 등)</span>
              </label>
            </p>
            <p className="mg--md">
              <input
                type="checkbox"
                id="etc"
                className="div--2__checkbox"
                name="serviceType"
                onChange={handleBusinessInfoChange}
                value="ETC"
              />
              <label htmlFor="etc" className="div--2__label">
                기타:
              </label>

              <input
                type="text"
                placeholder="직접입력"
                className="input--basic div--2__input__1"
                value={solutionETC}
                onChange={(e) => setSolutionETC(e.target.value)}
              />
            </p>

            <div className="mg--md">
              <p className="mg--sm">
                해당 서비스의 이름을 알려주세요.
                <span className="red-dot"></span>
              </p>
              <input
                type="text"
                className="input--basic"
                name="serviceName"
                value={businessInfo.serviceName}
                onChange={handleBusinessInfoChange}
              />
            </div>

            <div className="mg--md">
              <p className="mg--sm">
                매각하려는 온라인 서비스의 URL이 있다면, 주소를 입력해주세요.
              </p>
              <input
                type="text"
                className="input--basic"
                name="websiteURL"
                value={businessInfo.websiteURL}
                onChange={handleBusinessInfoChange}
              />
            </div>

            <div className="mg--md">
              <p className="mg--sm">
                사업자등록증이 있으시다면, 파일을 업로드해주세요. (.png or .jpg
                형식).
              </p>
              <input type="file" />
            </div>
          </div>

          <div className="mg--md">
            <p className="mg--sm">
              해당 서비스의 대략적인 월 영업이익을 선택해 주세요.
            </p>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="0"
                name="monthlyRevenue"
                className="radio--input"
                value="10 -"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="0">
                <span className="radio--btn"></span>
                거의 없음
              </label>
            </div>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="10"
                name="monthlyRevenue"
                className="radio--input"
                value="10~100"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="10">
                <span className="radio--btn"></span>
                10~100만원
              </label>
            </div>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="100"
                name="monthlyRevenue"
                className="radio--input"
                value="100~500"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="100">
                <span className="radio--btn"></span>
                100~500만원
              </label>
            </div>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="500"
                name="monthlyRevenue"
                className="radio--input"
                value="500~1000"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="500">
                <span className="radio--btn"></span>
                500~1000만원
              </label>
            </div>{" "}
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="1000"
                name="monthlyRevenue"
                className="radio--input"
                value="1000~3000"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="1000">
                <span className="radio--btn"></span>
                1000~3000만원
              </label>
            </div>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="3000"
                className="radio--input"
                name="monthlyRevenue"
                value="3000 + "
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="3000">
                <span className="radio--btn"></span>
                3000만원 이상
              </label>
            </div>
          </div>

          <div className="mg--md">
            <p className="mg--sm">해당 서비스의 희망 매각가를 알려주세요.</p>
            <p className="text--sm mg--sm">
              구체적인 가격이 정해지지 않았다면, 금액대를 입력하셔도 좋습니다.{" "}
              <span className="red-dot"></span>
            </p>
            <input
              type="number"
              className="input--basic"
              name="expectedPrice"
              value={businessInfo.expectedPrice}
              onChange={handleBusinessInfoChange}
            />
          </div>

          <div className="mg--md">
            <p className="mg--sm">
              가격 협의 가능 여부를 선택해주세요.
              <span className="red-dot"></span>
            </p>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="negotiable"
                className="radio--input"
                name="negotiable"
                value="true"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="negotiable">
                <span className="radio--btn"></span>
                협의 가능
              </label>
            </div>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="n-negotiable"
                className="radio--input"
                name="negotiable"
                value="false"
                onChange={handleBusinessInfoChange}
              />
              <label
                className="div--1--text radio--label"
                htmlFor="n-negotiable"
              >
                <span className="radio--btn"></span>
                협의 불가
              </label>
            </div>
          </div>

          <div>
            <h2 className="mg--md">
              대표님의 비즈니스를 비즈토스에 홍보해주세요.
            </h2>
            <p className="mg--sm">
              대표님의 비즈니스를 어필할 수 있는 매물 제목을 정해주세요.
            </p>
            <p className="text--sm mg--sm">
              * 매물 등록시 제목으로 등록되는 답변입니다. 예 : 심플하고 러블리한
              1020대 쇼핑몰 <span className="red-dot"></span>
            </p>
            <input
              type="text"
              className="input--basic mg--md"
              name="promotionalTitle"
              value={businessDetails.promotionalTitle}
              onChange={handleBusinessDetailsChange}
            />
          </div>

          <div className="mg--md">
            <p className="mg--sm">
              대표님의 비즈니스를 Buyer 분들에게 최대한 어필할 수 있도록
              비즈니스 설명을 적어주세요.
            </p>
            <p className="text--sm mg--sm">
              *추천항목 : 이 비즈니스의 특징 및 차별성/장점, 이 비즈니스를 어떤
              성향의 대표님께 추천하는지, 비즈니스 시작 계기, 매각을 결정하게 된
              사유 등 <span className="red-dot"></span>
            </p>
            <textarea
              className="input--basic"
              name="businessDescription"
              value={businessDetails.businessDescription}
              onChange={handleBusinessDetailsChange}
            />
          </div>

          <div className="mg--md">
            <h2 className="mg--weird">
              매물 등록을 위한 기타 정보를 입력해 주세요.
            </h2>
            <p className="mg--sm">
              바이어 분과 컨택하실 연락처를 입력해주세요. (이메일, 전화번호 등)
            </p>
            <p className="text--sm mg--sm">
              * 입력하신 번호는 매물 등록 상세 페이지에 공개됩니다. 사이트에
              공개되어도 무방한 메일주소/번호를 남겨주세요 &nbsp;
              <span className="red-dot"></span>
            </p>
            <input
              name="publicContact"
              type="text"
              className="input--basic"
              value={ownerInfo.publicContact}
              onChange={handleOwnerInfoChange}
            />
          </div>

          <div className="mg--md">
            <p className="mg--sm">
              비즈토스와 컨택하실 연락처를 입력해주세요. (이메일, 전화번호 등)
            </p>
            <p className="text--sm mg--sm">
              * 등록하신 매물이 리스트에 업로드 되면 연락을 보내드립니다. 외부에
              공개되지 않는 연락처이니, 자주 사용하시는 연락처를 입력해주세요.{" "}
              <span className="red-dot"></span>
            </p>
            <input
              name="privateContact"
              type="text"
              className="input--basic"
              onChange={handleOwnerInfoChange}
            />
          </div>

          <div>
            <p className="mg--sm">
              대표님 비즈니스의 거래 완료 여부를 파악하기 위해 비즈토스에서는
              매달 10일 대표님께 연락을 취할 예정입니다.
            </p>
            <p className="text--sm mg--sm">
              거래 확인, 연락 응답에 동의해주셩 매각 등록이 완료됩니다.{" "}
              <span className="red-dot"></span>
            </p>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="ndaAgreement"
                className="radio--input"
                name="ndaAgreement"
                value="true"
                onChange={handleBuyerInteractionChange}
              />

              <label className="radio--label text--sm" htmlFor="ndaAgreement">
                <span className="radio--btn"></span>네, 동의합니다.
              </label>
            </div>
          </div>

          <div>
            <p className="text--sm mg--sm">
              앱/웹의 로고, 쇼밍폴 로고 및 각종 영상/이미지 등 사업을 영위하기
              위해 필요한 각종 디자인이나 이름 등에 대하여 타인의 상표권,
              저작권및 기타 권리를 침혜한 사실이 없습니다.&nbsp;{" "}
              <span className="red-dot"></span>
            </p>
            <div className="div--1--radio-group">
              <input
                type="radio"
                id="noInfringement"
                className="radio--input"
                name="noInfringement"
                value="true"
                onChange={handleBuyerInteractionChange}
              />
              <label className="radio--label text--sm" htmlFor="noInfringement">
                <span className="radio--btn"></span>네, 없습니다.
              </label>
            </div>
          </div>
        </section>
        <button className="submit btn btn-signin ">매물등록 완료</button>
      </form>
    </main>
  );
};

export default page;
