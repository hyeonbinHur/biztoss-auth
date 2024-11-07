"use client";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import KameraPng from "@/public/camera.png";
import DefaultUser from "@/public/profile-picture.png";
import EditPng from "@/public/edit.png";
import BinPng from "@/public/trash-bin.png";
import AWS from "aws-sdk";

interface UserInfo {
  image: string;
  email: string;
  password: string;
  "pw check": string;
  username: string;
  usertype: string;
}
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

  //s3 config
  const [bucketInfo, setBucketInfo] = useState<any>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsEditImage(false);
    }
  };

  useEffect(() => {
    // assign & access to the bucket using AWS root key
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS,
    });
    const myBucket = new AWS.S3({
      params: { Bucket: "biztoss-hb" },
      region: "us-east-1",
    });
    setBucketInfo(myBucket);
  }, []);

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
    const params = {
      ACL: "public-read",
      ContentType: "image/jpeg",
      Body: ogFile,
      Bucket: "biztoss-hb",
      Key: "upload/" + ogFile.name,
    };

    return new Promise<string | false>((resolve) => {
      bucketInfo.putObject(params).send((err: any) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          const url = `https://${params.Bucket}.s3.${bucketInfo.config.region}.amazonaws.com/${params.Key}`;
          resolve(url);
        }
      });
    });
  };

  const handleSignUp = async (userinfo: UserInfo) => {
    const imageURL = await uploadFile();
    if (imageURL !== false) {
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
        console.log(userinfo);
        toast.success("Account created");
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
          required
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
        <input
          className="signup--input signup--input__first"
          type="text"
          placeholder="이메일"
          required
          {...register("email")}
        />

        {/* <span>이메일을 정확히 입력하세요</span> */}

        <input
          className="signup--input signup--input__second"
          type="password"
          placeholder="비밀번호"
          required
          {...register("password")}
        />

        <input
          className="signup--input signup--input__last"
          type="password"
          placeholder="비밀번호 확인"
          required
          {...register("pw check")}
        />
      </section>

      <section className="signup--section">
        <span className="signup--label">
          이름 <span className="signup--blue"></span>
        </span>

        <input
          className="signup--input"
          type="text"
          placeholder="이름"
          required
          {...register("username")}
        />
      </section>

      <section className="signup--section">
        <span className="signup--label">
          연락처 <span className="signup--blue"></span>
        </span>
        <input
          className="signup--input"
          type="text"
          placeholder="연락처"
          required
          {...register("username")}
        />
      </section>

      <section className="signup--section">
        <label className="signup--label">생년월일</label>

        <div className="signup--birth">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
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
            required
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
            required
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
