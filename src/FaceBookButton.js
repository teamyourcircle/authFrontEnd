import React from "react";

function FaceBookButton(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="18"
        height="30"
        viewBox="0 0 18 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.8206 16.7476L17.7534 11.3592H11.9178V7.86408C11.9178 6.38959 12.7315 4.95146 15.3452 4.95146H18V0.364078C18 0.364078 15.5918 0 13.2904 0C8.48226 0 5.3425 2.58128 5.3425 7.25243V11.3592H0V16.7476H5.3425V29.7743C6.41506 29.9236 7.51235 30 8.63016 30C9.74797 30 10.8453 29.9236 11.9178 29.7743V16.7476H16.8206Z"
          fill="#28284E"
        />
      </svg>

      <p
        style={{
          marginLeft: "22px",
          textAlign: "center",
          marginBottom: "9px",
          marginTop: "8px",
          marginRight: "-22px",
        }}
      >
        {props.context}
      </p>
    </div>
  );
}

export default FaceBookButton;
