"use client";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import KameraPng from "@/public/camera.png";
import DefaultUser from "@/public/profile-picture.png";
import EditPng from "@/public/edit.png";
import BinPng from "@/public/trash-bin.png";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import * as util from "@/util/util";

interface UserInfo {
  image: string;
  email: string;
  password: string;
  "pw check": string;
  username: string;
  usertype: string;
  contact: string;
}

type IsValid = "valid" | "empty" | "wrong" | "none";

const FormComp = () => {
  const form1 = useForm<UserInfo>();
  const { register, handleSubmit } = form1;

  //const image file config
  const [isEditImage, setIsEditImage] = useState(false);
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [ogFile, setOgFile] = useState<any>(null);
  const [year, setYear] = useState("1990");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const years = Array.from({ length: 100 }, (_, i) => 2023 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState<IsValid>("none");
  const [isPWValid, setIsPWValid] = useState<IsValid>("none");
  const [isConfirmPWValid, setIsConfirmPWValid] = useState<IsValid>("none");
  const [isNameValid, setIsNameVald] = useState<IsValid>("none");
  const [isContactValid, setIsContactValid] = useState<IsValid>("none");

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsEditImage(false);
    }
  };
  //s3 config
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS as string,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS as string,
    },
  });

  useEffect(() => {
    if (isEditImage) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditImage]);

  const onchangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUploadImgUrl(reader.result);
          console.log(reader.result);
          setIsEditImage(false);
          setOgFile(files[0]);
        }
      };
    }
  };

  const uploadFile = async () => {
    if (!ogFile) {
      return "https://biztoss-hb.s3.us-east-1.amazonaws.com/upload/profile-picture.png";
    }

    const params = {
      Bucket: "biztoss-hb",
      Key: `upload/${ogFile.name}`,
      Body: ogFile,
      ACL: "public-read" as ObjectCannedACL,
      ContentType: "image/jpeg",
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const url = `https://biztoss-hb.s3.us-east-1.amazonaws.com/${params.Key}`;
      return url;
    } catch (err) {
      console.error("Upload error:", err);
      return false;
    }
  };
  const validCheck = (userinfo: UserInfo): Boolean => {
    const emailValid = util.isEmailValid(userinfo.email);
    const passwordValid = util.isPasswordValid(userinfo.password);
    const pwConfirmValid = util.isConformPasswordValid(
      userinfo.password,
      userinfo["pw check"]
    );
    const nameValid = util.isNameValid(userinfo.username);
    const contactValid = util.isContactValid(userinfo.contact);
    if (emailValid === "valid") {
      setIsEmailValid(emailValid);
    } else {
      setIsEmailValid(emailValid);
      return false;
    }
    if (passwordValid === "valid") {
      setIsPWValid(passwordValid);
    } else {
      setIsPWValid(passwordValid);
      return false;
    }
    if (pwConfirmValid === "valid") {
      setIsConfirmPWValid(pwConfirmValid);
    } else {
      setIsConfirmPWValid(pwConfirmValid);
      return false;
    }
    if (nameValid === "valid") {
      setIsNameVald(nameValid);
    } else {
      setIsNameVald(nameValid);
      return false;
    }
    if (contactValid === "valid") {
      setIsContactValid(contactValid);
    } else {
      setIsContactValid(contactValid);
      return false;
    }
    return true;
  };

  const handleSignUp = async (userinfo: UserInfo) => {
    const imageURL = await uploadFile();
    const isAllgood = validCheck(userinfo);

    if (imageURL !== false) {
      if (isAllgood === true) {
        const storedUserType = localStorage.getItem("userType");
        userinfo.usertype = storedUserType as string;
        userinfo.image = imageURL;
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(userinfo),
        });
        const data = await response.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          const response = await signIn("credentials", {
            redirect: false,
            email: userinfo.email,
            password: userinfo.password,
          });
          if (response && !response.ok) {
            toast.error(response.error || "Failed to sign in");
          } else {
            router.push("/");
          }
        }
      } else {
      }
    } else {
      toast.error("Image upload failed");
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click(); // 클릭 이벤트를 트리거
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="signup--form">
      <section className="signup--avatar-section">
        {uploadImgUrl ? (
          <div className="signup--avatar__container">
            <img
              src={uploadImgUrl}
              alt="Uploaded Profile"
              className="signup--avatar"
            />
          </div>
        ) : (
          <div className="signup--avatar__container">
            <img
              src={DefaultUser.src}
              alt="Uploaded Profile"
              className="signup--avatar"
            />
          </div>
        )}
        <div>
          <div
            className="signup--camera__container"
            onClick={() => setIsEditImage((prev) => !prev)}
          >
            <img src={KameraPng.src} className="signup--camera__img" />
          </div>
          {isEditImage && (
            <ul ref={dropdownRef} className="signup-image--dropdown__ul">
              <li
                className="signup-image--dropdown__li"
                onClick={() => handleEditClick()}
              >
                <img
                  src={EditPng.src}
                  className="signup-image--dropdown__img"
                />
                수정
              </li>
              <li
                className={`signup-image--dropdown__li 
              ${
                uploadImgUrl
                  ? "signup-image--dropdown__li__delete "
                  : "    signup-image--dropdown__li__disabled"
              }`}
                onClick={() => {
                  if (uploadImgUrl) {
                    setUploadImgUrl("");
                    setIsEditImage(false);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""; // 파일 입력 필드 초기화
                    }
                  }
                }}
              >
                <img src={BinPng.src} className="signup-image--dropdown__img" />
                삭제
              </li>
            </ul>
          )}
        </div>

        <input
          type="file"
          placeholder="유저 프로필 아바타"
          accept="image/*"
          {...register("image")}
          ref={(e) => {
            register("image").ref(e); // register의 ref 사용
            fileInputRef.current = e; // fileInputRef에 할당
          }}
          onChange={onchangeImageUpload}
          className="signup--file-input"
        />
      </section>
      <section className="signup--section">
        {/* 평상시, 비었음, 성공, 틀림 */}
        <div
          className={`signup--input__container signup--input__container__first ${
            isEmailValid === "empty" || isEmailValid === "wrong"
              ? "signup--input__container__wrong"
              : ""
          }`}
        >
          <input
            className="signup--input signup--input"
            type="text"
            placeholder="이메일"
            {...register("email")}
          />
          {(isEmailValid === "empty" || isEmailValid === "wrong") && (
            <span className="signup__invalid">
              이메일을 정확하게 입력하세요.
            </span>
          )}
        </div>

        <div
          className={`signup--input__container signup--input__container__first ${
            isPWValid === "empty" || isPWValid === "wrong"
              ? "signup--input__container__wrong"
              : ""
          }`}
        >
          <input
            className="signup--input signup--input"
            type="password"
            placeholder="비밀번호"
            {...register("password")}
          />
          {isPWValid === "wrong" && (
            <span className="signup__invalid">
              최소 8글자 이상, 대문자, 특수문자 포함 필수.
            </span>
          )}
          {isPWValid === "empty" && (
            <span className="signup__invalid">비밀번호를 입력하세요.</span>
          )}
        </div>
        <div
          className={`signup--input__container  ${
            isConfirmPWValid === "empty" || isConfirmPWValid === "wrong"
              ? "signup--input__container__wrong"
              : ""
          }`}
        >
          <input
            className="signup--input signup--input__last"
            type="password"
            placeholder="비밀번호 확인"
            {...register("pw check")}
          />
          {isConfirmPWValid === "wrong" && (
            <span className="signup__invalid">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
          {isConfirmPWValid === "empty" && (
            <span className="signup__invalid">
              비밀번호를 한번 더 입력 하세요.
            </span>
          )}
        </div>
      </section>

      <section className="signup--section">
        <span className="signup--label">
          이름 <span className="signup--blue"></span>
        </span>
        <div
          className={`signup--input__container  ${
            isNameValid === "empty" ? "signup--input__container__wrong" : ""
          }`}
        >
          <input
            className="signup--input"
            type="text"
            placeholder="이름"
            {...register("username")}
          />
          {isNameValid === "empty" && (
            <span className="signup__invalid">이름을(를) 입력하세요</span>
          )}
        </div>
      </section>

      <section className="signup--section">
        <span className="signup--label">
          연락처 <span className="signup--blue"></span>
        </span>
        <div
          className={`signup--input__container  ${
            isContactValid === "empty" || isContactValid === "wrong"
              ? "signup--input__container__wrong"
              : ""
          }`}
        >
          <input
            className="signup--input"
            type="number"
            placeholder="연락처"
            {...register("contact")}
          />
          {(isContactValid === "wrong" || isContactValid === "empty") && (
            <span className="signup__invalid">연락처를 입력하세요</span>
          )}
        </div>
      </section>

      <section className="signup--section">
        <label className="signup--label">생년월일</label>

        <div className="signup--birth">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="signup--birth__item"
          >
            <option value="">연도</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="signup--birth__item"
          >
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>
          <select
            className="signup--birth__item"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </select>
        </div>
      </section>
      <button type="submit" className="btn btn-signin btn-signup">
        가입하기
      </button>
    </form>
  );
};

export default FormComp;
