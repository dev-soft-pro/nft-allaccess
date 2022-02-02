import React, { useEffect, useRef, useState } from 'react'

function PassClip(props) {
  const { pass } = props
  const videoRef = useRef();

  const [step, setStep] = useState(pass.revealed === 0 ? 0 : 2)

  // useEffect(() => {
  //   if (previousUrl.current === url) {
  //     return;
  //   }

  //   if (videoRef.current) {
  //     videoRef.current.load();
  //   }

  //   previousUrl.current = url;
  // }, [pass, step]);

  useEffect(() => {
    if (step === 0 && pass.revealed === 1) {
      setStep(1)
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  }, [pass])

  if (step === 0) {
    return (
      <video
        ref={videoRef}
        loop={true}
        playsInline={true}
        autoPlay={true}
        muted={true}
        playsInline={true}>
        <source src={pass.hidden_image.image} />
      </video>
    );
  } else if (step === 1) {
    return (
      <video
        ref={videoRef}
        playsInline={true}
        autoPlay={true}
        muted={true}
        playsInline={true}
        onEnded={(e) => setStep(2)}>
        <source src={pass.reveal_vid.reveal_vid} />
      </video>
    )
  } else if (step === 2) {
    return (
      <video
        ref={videoRef}
        loop={true}
        playsInline={true}
        autoPlay={true}
        muted={true}
        playsInline={true}>
        <source src={pass.image.image} />
      </video>
    )
  } else {
    return null
  }
}

export default PassClip;
