import Link from "next/link";

const page = () => {
  return (
    <div>
      <span>비즈토스에 가입하기 위해 다음 약관에 동의해 주세요.</span>
      <div>
        <input type="checkBox" />
        <label>이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</label>
      </div>
      <div>
        <input type="checkBox" />
        <label>
          이용 약관 동의 <span>(필수)</span>
        </label>
        <div>정보</div>
      </div>
      <div>
        <input type="checkBox" />
        <label>
          개인정보 수집 밎 이용 동의 <span>(필수)</span>
        </label>
        <div>정보</div>
      </div>
      <div>
        <input type="checkBox" />
        <label>
          만 14세 이상입니다. <span>(필수)</span>
        </label>
      </div>
      <p>
        <Link href="/usertype">취소</Link>
        <Link href="/signup">가입하기</Link>
      </p>
    </div>
  );
};

export default page;
