// check if back hair, front hair, eyebrows-b match
// long bangs in salmon, green, blue, and pink may be combined with any color back hair 
const hairColorsMatch = ( _dna = []) => {
    // check if long bangs salmon, green, blue or pink
    let frontHairColorCondition = _dna.some(e => e.includes("long-bangs") && (e.includes("salmon") || e.includes("green") || e.includes("blue") || e.includes("pink")));
  
    let colors = [];
    // TODO: refactor
    if(frontHairColorCondition) {
      _dna.forEach(function(element){
        if (element.includes("back-hair") || element.includes("eyebrows-b") || element.includes("front-hair")){
          // with matching back hair color or “back hair - straight black” or “back hair - wavy black”
          if (!(element.includes("back-hair") && (element.includes("straigth-black") || element.includes("wavy-black")))) {
            const color = element.split('-');
            colors.push(color[color.length - 2]);
          }
        } 
      });
    } else {
      _dna.forEach(function(element){
        if (element.includes("back-hair") || element.includes("front-hair") || element.includes("eyebrows-b")){
          const color = element.split('-');
          colors.push(color[color.length - 2]);
        }
      });
    }
    return colors.every( (val, i, arr) => val === arr[0] );
  };
  
  // long bangs cannot be combined with "veil solid" or "veil gauzy" in forehead jewelry category
  const areLongBangsWithVeilJewelry = ( _dna = []) => {
    return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("veil") && e.includes("jewelry-forehead"));
  };
  
  //"back hair - solid veil" must be paired with "jewelry-forehead - veil solid" in the same color.
  const areBackHairSolidVeilWithJewelryVeilSolid = ( _dna = []) => {
    return _dna.some(e => e.includes("back-hair") && e.includes("solid-veil")) && _dna.some(e => e.includes("veil-solid") && e.includes("jewelry-forehead"));
  };
  
  const backHairSolidVeilExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("back-hair") && e.includes("solid-veil"))){
      return areBackHairSolidVeilWithJewelryVeilSolid(_dna);
    }
    return true;
  };
  
  //"front hair - long bangs" & variant colors of it cannot be combined with "back hair - natural black"
  const areLongBangsWithNaturalBlackHair = ( _dna = []) => {
    return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("natural-black"));
  };
  
  //"jewelry face - snake bites" cannot be combined with "mouth - full smile red" or "mouth - full smile hazelnut"
  const areJewelrySnakeBitesWithFullMouthRedHazelnut = ( _dna = []) => {
    return _dna.some(e => e.includes("snake-bites")) && (_dna.some(e => e.includes("full-smile-red")) || _dna.some(e => e.includes("full-smile-hazelnut")));
  };
  
  // " Natural black hair with tight curl pattern should only go with hazel and night color skin tones"
  const isNaturalBlackWithHazelAndNighSkin = ( _dna = []) => {
    return _dna.some(e => e.includes("natural-black")) && (_dna.some(e => e.includes("hazel")) || _dna.some(e => e.includes("baby night")));
  };
  
  //back hair - natural black must be paired with "front hair - cornrows" or "front hair - baby curls"
  const isNaturalBlackWithCornRowsOrBabyCurls = ( _dna = []) => {
    return _dna.some(e => e.includes("natural-black")) && (_dna.some(e => e.includes("cornrows")) || _dna.some(e => e.includes("baby curls")));
  };
  
  const naturalBlackExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("natural-black"))){
      return isNaturalBlackWithCornRowsOrBabyCurls(_dna) && isNaturalBlackWithHazelAndNighSkin(_dna);
    }
    return true;
  };
  
  // "front hair - cornrows" of any color must be paired with "back hair - small braids" of the same color
  const areFrontHairCornrowsWithBackHairSmallBraids = ( _dna = []) => {
    return _dna.some(e => e.includes("cornrows")) && _dna.some(e => e.includes("small-braids"));
  };
  
  const cornrowsExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("cornrows"))){
      return areFrontHairCornrowsWithBackHairSmallBraids(_dna);
    }
    return true;
  };
  
  // front hair cornrows and back hair small braids cannot be paired with "sand" base
  const isSandBaseWithCornrowsOrSmallBraids = ( _dna = []) => {
    return _dna.some(e => e.includes("base") && e.includes("sand")) && (_dna.some(e => e.includes("cornrows")) || _dna.some(e => e.includes("small-braids")));
  };
  
  // front hair - choppy microbangs" can only be paired with "back hair - choppy pixie" usual color rules apply
  const areChoppyMicrobangsWithChoppyPixie = ( _dna = []) => {
    return _dna.some(e => e.includes("choppy-microbangs")) && _dna.some(e => e.includes("choppy-pixie"));
  };
  
  const choppyExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("choppy-microbangs"))){
      return areChoppyMicrobangsWithChoppyPixie(_dna);
    }
    return true;
  };
  
  // "back hair - small braids" can only be paired with "front hair - cornrows" or "front hair - baby curls"
  const areSmallBraidsWithCornrowsOrBabyCurls = ( _dna = []) => {
    return _dna.some(e => e.includes("small-braids")) && (_dna.some(e => e.includes("choppy-pixie")) || _dna.some(e => e.includes("baby-curls")));
  };
  
  const smallBraidsExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("small-braids"))){
      return areSmallBraidsWithCornrowsOrBabyCurls(_dna);
    }
    return true;
  };
  
  // "front hair - baby curls" may be paired with any "back hair - small braids" color
  const areBabyCurlsWithSmallBraids = ( _dna = []) => {
    return _dna.some(e => e.includes("baby-curls")) && _dna.some(e => e.includes("small-braids"));
  };
  
  const babyCurlsExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("baby-curls"))){
      return areBabyCurlsWithSmallBraids(_dna);
    }
    return true;
  };
  
  // "front hair - choppy microbangs" can only be paired with "back hair - choppy pixie"
  const isFrontChoppyWithBackChoppy = ( _dna = []) => {
    return _dna.some(e => e.includes("back-hair") && e.includes("choppy-pixie")) && (_dna.some(e => e.includes("front-hair")) || _dna.some(e => e.includes("choppy-microbangs")));
  };
  
  const choppyPixieExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("choppy-pixie"))){
      return isFrontChoppyWithBackChoppy(_dna);
    }
    return true;
  };

  // if jewelry face exists, no jewelry forehead
  const isJewelryFaceWithJewelryForehead = ( _dna = []) => {
    return _dna.some(e => e.includes("jewelry-face")) && (_dna.some(e => e.includes("jewelry-forehead")));
  };

  // when front hair is "front hair - shaved head" then there can be no back hair
  const isShavedHeadWithBackHair = ( _dna = []) => {
    return _dna.some(e => e.includes("shaved")) && (_dna.some(e => e.includes("back-hair")));
  };

  //if there is a tattoo, clothing cannot be "simple tee" or "simple turtleneck" of any color
  const isTattooWithSimpleTeeorTurtleneck = ( _dna = []) => {
    return _dna.some(e => e.includes("tattoos") && (_dna.some(e => e.includes("simple-tee")) || _dna.some(e => e.includes("simple-turtleneck"))));
  };
  
  const tattooExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("tattoos"))){
      return !isTattooWithSimpleTeeorTurtleneck(_dna);
    }
    return true;
  };

  // "jewelry - neck ribbon" of any color cannot be combined with "clothing - simple turtleneck" of any color
  const isJewelryNeckRibbonWithSimpleTurtleneck = ( _dna = []) => {
    return _dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon") && (_dna.some(e => e.includes("simple-turtleneck"))));
  };
  
  const jewelryNeckRibbonExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon"))){
      return !isJewelryNeckRibbonWithSimpleTurtleneck(_dna);
    }
    return true;
  };

  // "jewelry - neck stacked collar" cannot be combined with "clothing - simple turtleneck" of any color
  const isJewelryNeckStackedCollarWithSimpleTurtleneck = ( _dna = []) => {
    return _dna.some(e => e.includes("jewelry-neck") && e.includes("stacked-collar") && (_dna.some(e => e.includes("simple-turtleneck"))));
  };
  
  const jewelryNeckStackedCollarExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("jewelry-neck") && e.includes("stacked-collar"))){
      return !isJewelryNeckStackedCollarWithSimpleTurtleneck(_dna);
    }
    return true;
  };

  //base - spice of any shape may not be combined with any hairstyle with "brown" in its name
  const isBaseSpiceWithBrownHairstyle = ( _dna = []) => {
    return _dna.some(e => e.includes("base") && e.includes("spice")) && (_dna.some(e => e.includes("hair") && e.includes("brown")));
  };
  
  const baseSpiceExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("base") && e.includes("spice"))){
      return !isBaseSpiceWithBrownHairstyle(_dna);
    }
    return true;
  };

// if jewelry - forehead - veil then back hair must be back hair - veil of the same color
const isJewelryForeheadVeilAndBackHairVeil = ( _dna = []) => {
  return _dna.some(e => e.includes("forehead") && e.includes("veil")) && (_dna.some(e => e.includes("back-hair") && e.includes("veil")));
};  

const foreheadVeilExistsAndApplyRules = ( _dna = []) => {
  if (_dna.some(e => e.includes("forehead") && e.includes("veil"))){
    return isJewelryForeheadVeilAndBackHairVeil(_dna);
  }
  return true;
};

// necklace - wagni and necklace - ribbon cannot be combined,
const isNecklaceWagmiAndNecklaceRibbon = ( _dna = []) => {
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("wagmi")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon")));
}; 

// necklace - choker and necklace - ribbon cannot be combined
const isNecklaceRibbonAndBlank = ( _dna = []) => {
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("collar")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon")));
}; 

// necklace-wagmi-collar, necklace - high collar, necklace - ribbon, and necklace - spiked collar 
const isNecklaceCollarAndBlank = ( _dna = []) => {
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("collar")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("Blank")));
}; 

// rules
const rules = ( _dna = []) => {
    return hairColorsMatch(_dna) && 
      !areLongBangsWithVeilJewelry(_dna) && 
      !areLongBangsWithNaturalBlackHair(_dna) &&
      !areJewelrySnakeBitesWithFullMouthRedHazelnut(_dna) &&
      !isJewelryFaceWithJewelryForehead(_dna) &&
      !isShavedHeadWithBackHair(_dna) &&
      !isNecklaceWagmiAndNecklaceRibbon(_dna) &&
      isNecklaceCollarAndBlank(_dna) &&
      isNecklaceRibbonAndBlank(_dna) &&
      cornrowsExistsAndApplyRules(_dna) && 
      !isSandBaseWithCornrowsOrSmallBraids(_dna) && 
      naturalBlackExistsAndApplyRules(_dna) &&
      choppyExistsAndApplyRules(_dna) &&
      smallBraidsExistsAndApplyRules(_dna) &&
      babyCurlsExistsAndApplyRules(_dna) &&
      choppyPixieExistsAndApplyRules(_dna) &&
      backHairSolidVeilExistsAndApplyRules(_dna) &&
      tattooExistsAndApplyRules(_dna) &&
      jewelryNeckRibbonExistsAndApplyRules(_dna) &&
      jewelryNeckStackedCollarExistsAndApplyRules(_dna) &&
      baseSpiceExistsAndApplyRules(_dna) &&
      foreheadVeilExistsAndApplyRules(_dna);
  };

  module.exports = { rules }