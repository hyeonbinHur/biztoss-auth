"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

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

const Page: React.FC = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    console.log("Submitted Form Data:", JSON.stringify(outputData, null, 2));
  };

  return (
    <main className="sale-form">
      <form className="form" onSubmit={handleSubmit}>
        <section className="form--section__3">
          <div className="div--1">
            <h3 className="div--1--title">
              대표님의 비즈니스 정보를 사실에 기반하여 작성해주세요.
            </h3>
            <p className="div--1--text">
              대표님께서는 비즈니스 매각을 어느정도 고려하고 계시나요?
            </p>

            <div className="div--1--radio-group">
              <input
                type="radio"
                id="later"
                name="sellUrgency"
                value="Considering selling in the future"
                className="radio--input"
                onChange={handleOwnerInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="later">
                추후 매각 고려중
              </label>
            </div>

            <div className="div--1--radio-group">
              <input
                type="radio"
                id="urgent"
                name="sellUrgency"
                value="Urgent sale"
                className="radio--input"
                onChange={handleOwnerInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="urgent">
                매각급함
              </label>
            </div>
          </div>

          <div className="div--2">
            <p>매각하시려는 서비스의 분야를 알려주세요.</p>

            <p>
              <input
                type="checkbox"
                id="shoppingmall"
                name="serviceType"
                value="Shopping Mall"
                className="div--2__checkbox"
                onChange={handleBusinessInfoChange}
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
                type="file"
                name="businessRegistrationFile"
                onChange={handleBusinessInfoChange}
              />
            </p>

            <div>
              <p>해당 서비스의 희망 매각가를 알려주세요.</p>
              <input
                type="text"
                name="expectedPrice"
                className="input--basic"
                onChange={handleBusinessInfoChange}
              />
            </div>

            <div className="div--1--radio-group">
              <input
                type="radio"
                id="negotiable"
                name="negotiable"
                value="negotiable"
                className="radio--input"
                onChange={handleBusinessInfoChange}
              />
              <label className="div--1--text radio--label" htmlFor="negotiable">
                협의 가능
              </label>
            </div>
          </div>
        </section>

        <button className="submit btn btn-signin" type="submit">
          매물등록 완료
        </button>
      </form>
    </main>
  );
};

export default Page;
