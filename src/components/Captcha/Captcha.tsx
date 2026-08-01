import { useEffect, useState } from "react";
import { getCaptcha } from "../../api/captcha";

interface Props {
  onChange: (captchaId: string, captchaText: string) => void;
}

export default function Captcha({ onChange }: Props) {
  const [captchaId, setCaptchaId] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const loadCaptcha = async () => {
    try {
      const data = await getCaptcha();

      setCaptchaId(data.captchaId);
      setImage(data.image);

      setText("");

      onChange(data.captchaId, "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: image,
        }}
      />

      <input
        type="text"
        placeholder="Enter captcha"
        value={text}
        onChange={(e) => {
          setText(e.target.value);

          onChange(captchaId, e.target.value);
        }}
      />

      <button type="button" onClick={loadCaptcha}>
        Refresh
      </button>
    </div>
  );
}
