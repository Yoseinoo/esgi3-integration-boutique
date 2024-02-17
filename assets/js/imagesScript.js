/*var mainImgContainer = document.getElementById("main-image-container");
var landingImage = document.getElementById("landingImage");
var imgWrapperDiv = document.getElementById("imgTagWrapperId");

var containerWidth = mainImgContainer.offsetWidth;
var holderRatio = 1.0;
var shouldAutoPlay = false;
var containerHeight = containerWidth / holderRatio;
containerHeight = Math.min(containerHeight, 700);

var dynamicImageMaxHeight = 453;
var dynamicImageMaxWidth = 679;

dynamicImageMaxHeight = landingImage.naturalHeight;
dynamicImageMaxWidth = landingImage.naturalWidth;

var aspectRatio = dynamicImageMaxWidth / dynamicImageMaxHeight;

var imageMaxHeight = containerHeight;
var imageMaxWidth = containerWidth;

if (!shouldAutoPlay && !true) {
    imageMaxHeight = Math.min(imageMaxHeight, dynamicImageMaxHeight);
    imageMaxWidth = Math.min(imageMaxWidth, dynamicImageMaxWidth);
}


var useImageBlockLeftColCentering = false;
var rightMargin = 40;

if (typeof useImageBlockLeftColCentering !== "undefined" && useImageBlockLeftColCentering) {
    mainImgContainer.style.marginRight = rightMargin + "px";
}
mainImgContainer.style.height = containerHeight + "px";

var imageMaxWidthBasedOnHeight = imageMaxHeight * aspectRatio;
var imageMaxHeightBasedOnWidth = imageMaxWidth / aspectRatio;
imageMaxHeight = Math.min(imageMaxHeight, imageMaxHeightBasedOnWidth);
imageMaxWidth = Math.min(imageMaxWidth, imageMaxWidthBasedOnHeight);

if (imgWrapperDiv) {
    imgWrapperDiv.style.height = containerHeight + "px";
}

if (landingImage) {
    landingImage.style.maxHeight = imageMaxHeight + "px";
    landingImage.style.maxWidth = imageMaxWidth + "px";
}

if (shouldAutoPlay) {
    if (landingImage) {
        landingImage.style.height = imageMaxHeight + "px";
        landingImage.style.width = imageMaxWidth + "px";
    }
}*/