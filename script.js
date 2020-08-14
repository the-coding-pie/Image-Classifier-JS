// grab reference for needed elements
// .image
const image = document.querySelector('.image');
// .label-text
const labelText = document.querySelector('.label-text');
// .accuracy-text
const accuracyText = document.querySelector('.accuracy-text');
// .predict-btn
const predictBtn = document.querySelector('.predict-btn');
// .upload-btn will go here
const uploadBtn = document.querySelector('.upload-btn');

// Loading our MobileNet model
const model = ml5.imageClassifier("MobileNet", modelLoaded);

// modelLoaded() callback function definition
function modelLoaded() {
  
  // first just console.log() 'Model Loaded'
  console.log('Model Loaded!');
  // then enable the .predict-btn
  predictBtn.disabled = false;

  /* then attach an 'click' eventListener to .predict-btn */
  predictBtn.addEventListener('click', predict);
}

// predict() callback function definition
function predict() {
  /* take the .image and classify() it */
  model.classify(image, function (error, results) {
    // check if error happened
    if (error) {
      // just console.log() the error
      console.log('Error: ', error);
    } else {
      /* from "results" array, grab first element's "label" and "confidence" level */
      const label = results[0].label.toUpperCase();
      const accuracy = (results[0].confidence * 100).toFixed(2);

      /* update .label-text and .accuracy-text */
      labelText.innerText = label;
      /* Careful Here: Use back-ticks ``, Not single quote '' or double quote "" */
      accuracyText.innerText = `Accuracy: ${accuracy}%`;
    }
  });
}

/* attach a 'change' eventListener to .upload-btn */
uploadBtn.addEventListener('change', function (event) {
  // check if user had selected any file
  if (event.target.files[0]) {
    /* create an ObjectURL for the selected/uploaded file */
    const objectURL = URL.createObjectURL(event.target.files[0]);

    /* then replace previous .image on DOM with the new file the user had uploaded */
    image.src = objectURL;
  }
});
