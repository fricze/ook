const OPENAI_API_KEY = "";

const state = {
  loading: false,
};

const getImage = async () => {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: "a white siamese cat in style of rubens. glorious painting",
      n: 1,
      size: "1024x1024",
    }),
  });
  const value = await response.json();
  return value;
};

export function setupCounter(element: HTMLButtonElement) {
  // let counter = 0;
  // const setCounter = (count: number) => {
  //   counter = count;
  //   element.innerHTML = `count is ${counter}`;
  // };
  // element.addEventListener("click", () => setCounter(counter + 1));
  // setCounter(0);

  const imgElement = document.querySelector("#current-image");
  const loadingElement = document.querySelector("#loading");
  const saveImg = document.querySelector("#save-img");

  const createImage = async () => {
    loadingElement?.setAttribute("class", "show");
    // const img = await getImage();
    // const src = img?.data?.[0]?.url ?? "";
    const src =
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wc0u5MHfgmapM6oZZ80I9zNc/user-MzxYiqqTpUMABQ3YTG13q3ci/img-Ua8XhYSzaEHt8cbjdOESrVvl.png?st=2024-03-03T18%3A36%3A05Z&se=2024-03-03T20%3A36%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-03T15%3A17%3A10Z&ske=2024-03-04T15%3A17%3A10Z&sks=b&skv=2021-08-06&sig=BKC2In6EYbQvShYblw8NxlfHokdCDrybHJMYTftD3BU%3D";
    saveImg?.setAttribute("href", src);

    // const imageFetch = fetch(src, { method: "GET", mode: "no-cors" });
    // const imageResponse = await imageFetch;

    // if (imageResponse.ok) {
    //   const imageBlob = await imageResponse.blob();
    //   debugger;
    //   const fileHandle = await window.showSaveFilePicker({
    //     suggestedName: "downloaded-image.png",
    //     types: [
    //       {
    //         description: "Image file",
    //         accept: { "image/png": [".png"] },
    //       },
    //     ],
    //   });

    //   const writableStream = await fileHandle.createWritable();
    //   await writableStream.write(imageBlob);
    //   await writableStream.close();
    // }

    imgElement?.setAttribute("src", src);
    loadingElement?.setAttribute("class", "");
  };

  element.addEventListener("click", createImage);
}
