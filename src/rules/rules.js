// check if back hair, front hair, eyebrows-b match
// long bangs in salmon, green, blue, and pink may be combined with black back hair or the same color back hair
const hairColorsMatch = ( _dna = []) => {
  if(_dna.some(e => e.includes("shaved"))) {
    return true;
  }
    // check if long bangs salmon, green, blue or pink
    // let frontHairColorCondition = _dna.some(e => e.includes("long-bangs") && (e.includes("salmon") || e.includes("green") || e.includes("blue") || e.includes("pink")));
  
    let colors = [];
    // TODO: refactor
    // if(frontHairColorCondition) {
    //   _dna.forEach(function(element){
    //     if (element.includes("back-hair") || element.includes("eyebrows-b") || element.includes("front-hair")){
    //       // with matching back hair color or back hair - straight black, back hair - wavy black
    //       if (!(element.includes("back-hair") && (element.includes("straigth-black") || element.includes("wavy-black")))) {
    //         const color = element.split('-');
    //         colors.push(color[color.length - 2]);
    //       }
    //     } 
    //   });
    // } else {
      _dna.forEach(function(element){
        if (element.includes("back-hair") || element.includes("front-hair") || element.includes("eyebrows-b")){
          const color = element.split('-');
          colors.push(color[color.length - 2]);
        }
      });
    // }
    return colors.every( (val, i, arr) => val === arr[0] );
  };
  
  // long bangs cannot be combined with "veil solid" or "veil gauzy" in forehead jewelry category
  const areLongBangsWithVeilJewelry = ( _dna = []) => {
    if(!_dna.some(e => e.includes("long-bangs"))) {
      return false;
    }
    return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("veil") && e.includes("jewelry-forehead"));
  };
  
  // //"front hair - long bangs" & variant colors of it cannot be combined with "back hair - natural black"
  const areLongBangsWithNaturalBlackHair = ( _dna = []) => {
    if(!_dna.some(e => e.includes("long-bangs"))) {
      return false;
    }
    return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("natural-black"));
  };


  //"jewelry face - snake bites" cannot be combined with "mouth - full smile red" or "mouth - full smile hazelnut"
  const areJewelrySnakeBitesWithFullMouthRedHazelnut = ( _dna = []) => {
    if(!_dna.some(e => e.includes("snake-bites"))) {
      return false;
    }
    return _dna.some(e => e.includes("snake-bites")) && (_dna.some(e => e.includes("full-smile-red")) || _dna.some(e => e.includes("full-smile-hazelnut")));
  };
  
  // " Natural black hair with tight curl pattern should only go with hazel and night color skin tones"
  const isNaturalBlackWithHazelAndNighSkin = ( _dna = []) => {
    return _dna.some(e => e.includes("natural-black")) && (_dna.some(e => e.includes("hazel")) || _dna.some(e => e.includes("baby night")));
  };
  
  //back hair - natural black must be paired with "front hair - cornrows" or "front hair - baby curls"
  const isNaturalBlackWithCornRowsOrBabyCurls = ( _dna = []) => {
    return _dna.some(e => e.includes("natural-black")) && (_dna.some(e => e.includes("cornrows")) || _dna.some(e => e.includes("baby-curls")));
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
  //new: any front or back hair with the words "cornrows" or "natural" in it can only be paired with base of color bisque, hazel, or night
  const isDarkBaseWithCornrowsOrSmallBraids = ( _dna = []) => {
    if(!_dna.some(e => e.includes("cornrows") || e.includes("back-hair---natural"))) {
      return true;
    }
    return _dna.some(e => e.includes("base") && e.includes("spice")) || (_dna.some(e => e.includes("base") && e.includes("hazel")) ||  _dna.some(e => e.includes("base") && e.includes("night")));
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
    return _dna.some(e => e.includes("small-braids")) && (_dna.some(e => e.includes("cornrows")) || _dna.some(e => e.includes("baby-curls")));
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
    if (_dna.some(e => e.includes("jewelry-face") && e.includes("none"))) {
      return false;
    }
    return _dna.some(e => e.includes("jewelry-face") && !e.includes("none")) && (_dna.some(e => e.includes("jewelry-forehead") && !e.includes("none")));
  };

  // when front hair is "front hair - shaved head" then there can be no back hair
  const isShavedHeadWithBackHair = ( _dna = []) => {
    if(!_dna.some(e => e.includes("shaved"))) {
      return true;
    }
    return _dna.some(e => e.includes("shaved")) && (_dna.some(e => e.includes("back-hair") && e.includes("none")));
  };

  // when front hair is "front hair - shaved head" then no bandana
  const isShavedHeadWithBandana = ( _dna = []) => {
    if(!_dna.some(e => e.includes("shaved"))) {
      return false;
    }
    return _dna.some(e => e.includes("shaved")) && (_dna.some(e => e.includes("jewelry-face") && e.includes("bandana")));
  };

  //if there is a tattoo, clothing cannot be "simple tee" or "simple turtleneck" or clothing - ruffle turtleneckof any color
  const isTattooWithSimpleTeeorTurtleneck = ( _dna = []) => {
    return _dna.some(e => e.includes("tattoos")) && (_dna.some(e => e.includes("simple-tee")) || _dna.some(e => e.includes("simple-turtleneck")) || _dna.some(e => e.includes("ruffle-turtleneck")));
  };
  
  const tattooExistsAndApplyRules = ( _dna = []) => {
    if (_dna.some(e => e.includes("tattoos") && !e.includes("none"))){
      return !isTattooWithSimpleTeeorTurtleneck(_dna);
    }
    return true;
  };

  // "jewelry - neck" of any color cannot be combined with "clothing - simple turtleneck" of any color
  const isJewelryNeckWithSimpleTurtleneck = ( _dna = []) => {
    if(!_dna.some(e => e.includes("simple-turtleneck"))) {
      return false;
    }
    return _dna.some(e => e.includes("jewelry-neck") && (e.includes("wagmi") || e.includes("collar") || e.includes("ribbon") || e.includes("layered") || e.includes("chain")) && (_dna.some(e => e.includes("simple-turtleneck"))));
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

// necklace - wagni and necklace - ribbon cannot be combined,
const isNecklaceWagmiAndNecklaceRibbon = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-neck") && e.includes("wagmi"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("wagmi")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon")));
}; 

// necklace - choker and necklace - ribbon cannot be combined
const isNecklaceRibbonAndBlank = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-neck") && e.includes("collar"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("collar")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("ribbon")));
}; 

// necklace-wagmi-collar, necklace - high collar, necklace - ribbon, and necklace - spiked collar cannor be combined
const isNecklaceCollarAndBlank = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-neck") && e.includes("collar"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-neck") && e.includes("collar")) && (_dna.some(e => e.includes("jewelry-neck") && e.includes("Blank")));
}; 

//"back hair - solid veil" must be paired with "jewelry-forehead - veil solid" in the same color.
const areBackHairSolidVeilWithJewelryVeilSolid = ( _dna = []) => {
  let colors = [];
  _dna.forEach(function(element){
    if (element.includes("jewelry-forehead---veil-solid") || (element.includes("back-hair---solid-veil") )){
      const color = element.split('-');
      colors.push(color[color.length - 2]);
    }
  });

  return _dna.some(e => e.includes("back-hair") && e.includes("solid-veil")) && _dna.some(e => e.includes("veil-solid") && e.includes("jewelry-forehead")) && colors.every( (val, i, arr) => val === arr[0] );
};

const backHairSolidVeilExistsAndApplyRules = ( _dna = []) => {
  // not applied if already paired with hijab
  if (_dna.some(e => e.includes("back-hair") && e.includes("solid-veil")) && !_dna.some(e => e.includes("hijab"))){
    return areBackHairSolidVeilWithJewelryVeilSolid(_dna);
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

// "front  hair - hijab" must be paired with the same color of "back hair - solid veil" 
const isHijabWithSolidVeil = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return true;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("back-hair") && e.includes("solid-veil")));
};

// "front hair - hijab" can only be paired with "base - full" of any color
const isHijabWithBaseFull = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return true;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("base") && e.includes("full")));
};

//"front hair - hijab" cannot be paired with "jewelry - forehead" of any kind
const isHijabWithJewelryForehead = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return false;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("jewelry-forehead") && !e.includes("none")));
};

//"front hair - hijab" cannot be paired with "earrings" of any kind
const isHijabWithEarrings = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return false;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("earrings") && !e.includes("none")));
};

//"front hair - hijab" cannot be paired with bandana
const isHijabWithBandana = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return false;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("bandana")));
};
// no jewelry - forehead with "front hair - shaved"
const isShavedWithJewelryForehead = ( _dna = []) => {
  if(!_dna.some(e => e.includes("shaved"))) {
    return false;
  }
  return _dna.some(e => e.includes("shaved")) && (_dna.some(e => e.includes("jewelry-forehead") && !e.includes("none")));
};


// cannot combine "front hair - shaved" with "jewelry-face - bandana cute" or "jewelry-face - circlet" or "jewelry-face - tiara circlet" or "jewelry-face - gemstone tiara" or "jewelry-face - cherry blossom crown" of any color
const isShavedWithJewelryFace= ( _dna = []) => {
  if(!_dna.some(e => e.includes("shaved"))) {
    return false;
  }
  return _dna.some(e => e.includes("shaved")) && (_dna.some(e => e.includes("jewelry-face---bandana-cute")) || _dna.some(e => e.includes("jewelry-face---circlet")) || _dna.some(e => e.includes("jewelry-face---tiara-circlet")) || _dna.some(e => e.includes("jewelry-forehead---gemstone-tiara")) || _dna.some(e => e.includes("jewelry-forehead---cherry")));
};


// no earrings with "jewelry - forehead - veil solid"
const isEarringsWithJewelryForeheadVeil = ( _dna = []) => {
  if(!_dna.some(e => e.includes("earrings"))) {
    return false;
  }
  return _dna.some(e => e.includes("earrings")) && (_dna.some(e => e.includes("jewelry-forehead---veil-solid")));
};

// there cannot be more than one layer with the word "glasses" in the title
const isGlassesMoreThanOne = ( _dna = []) => {
  if(!_dna.some(e => e.includes("glasses"))) {
    return false;
  }
  return _dna.filter(e => e.includes("glasses")).length > 1;
};

//"clothing - ruffle turtleneck" of any color cannot be paired with "jewelry - neck - stacked collar" or "jewelry - neck - spiked collar"
const isRuffleTurtleneckWithJewelryNeckCollar = ( _dna = []) => {
  if(!_dna.some(e => e.includes("ruffle-turtleneck"))) {
    return false;
  }
  return _dna.some(e => e.includes("ruffle-turtleneck")) && (_dna.some(e => e.includes("jewelry-neck---stacked-collar")) || _dna.some(e => e.includes("jewelry-neck---spiked-collar")));
};

//"jewelry - face - snake bites" cannot be paired with "mouth - full smile"
const isSnakeBitesWithFullSmile = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-face---gold-snake-bites"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-neck---snake-bites")) && (_dna.some(e => e.includes("mouth---full-smile")));
};

// "front hair - pushed back" cannot be paired with "back hair - loose curls"
const isPushedBackWithLooseCurls = ( _dna = []) => {
  if(!_dna.some(e => e.includes("front-hair---pushed-back"))) {
    return false;
  }
  return _dna.some(e => e.includes("front-hair---pushed-back")) && (_dna.some(e => e.includes("back-hair---loose-curls")));
};

// "front hair - messy bangs" cannot be paired with "back hair - thick braids" or "back hair - tall pony" or "back hair - low pigtails" or "back hair - high pigtails"
const isMessyBangsWithJBackHairVariants = ( _dna = []) => {
  if(!_dna.some(e => e.includes("front-hair--messy-bangs"))) {
    return false;
  }
  return _dna.some(e => e.includes("front-hair--bangs-messy")) && (_dna.some(e => e.includes("back-hair---thick-braids")) || _dna.some(e => e.includes("back-hair---tall-pony")) || _dna.some(e => e.includes("back-hair---low-pigtails")) || _dna.some(e => e.includes("back-hair---high-pigtails")));
};

// "front hair - hijab" must be paired with "clothing - simple tee" or "clothing - simple turtleneck"
const isHijabWithSimpleClothing = ( _dna = []) => {
  if(!_dna.some(e => e.includes("hijab"))) {
    return true;
  }
  return _dna.some(e => e.includes("hijab")) && (_dna.some(e => e.includes("simple")) || _dna.some(e => e.includes("simple-turtleneck")));
};

// "front hair - long bangs" can only be paired with "back hair - straight" or "back hair - wavy"
const isLongBangsWithStraigthWavy = ( _dna = []) => {
  if(!_dna.some(e => e.includes("front-hair---long-bangs"))) {
    return true;
  }
  return _dna.some(e => e.includes("front-hair---long-bangs")) && (_dna.some(e => e.includes("back-hair---straight")) || _dna.some(e => e.includes("back-hair---wavy")));
};

// if long bangs in front, they shouldn’t have wagmi earings 
const isLongBangsWithWagmi = ( _dna = []) => {
  if(!_dna.some(e => e.includes("front-hair---long-bangs"))) {
    return false;
  }
  return _dna.some(e => e.includes("front-hair---long-bangs")) && _dna.some(e => e.includes("earrings---wagmi"));
};

// if high pigtails, no bandana or jewelry forehead
const isPigtailsWitForehead = ( _dna = []) => {
  if(!_dna.some(e => e.includes("back-hair---high-pigtails"))) {
    return false;
  }
  return _dna.some(e => e.includes("back-hair---high-pigtails")) && (_dna.some(e => e.includes("bandana")) || _dna.some(e => e.includes("jewelry-forehead") && !e.includes("none")));
};

// if bandana or jewelry forehead
const isBandanaWithForehead = ( _dna = []) => {
  if(!_dna.some(e => e.includes("bandana"))) {
    return false;
  }
  return _dna.some(e => e.includes("bandana")) && ( _dna.some(e => e.includes("jewelry-forehead") && !e.includes("none")));
};

// no black earrings with black long bangs
const isBlackEarringsWitBlackLongBangs = ( _dna = []) => {
  if(!_dna.some(e => e.includes("back-hair---long-bangs-black"))) {
    return false;
  }
  return _dna.some(e => e.includes("back-hair---long-bangs-black")) && _dna.some(e => e.includes("earrings") && e.includes("black"));
};

// no forehead jewelry with straight bangs
const isForeheadJewelryWithStraightBangs = ( _dna = []) => {
  if(!_dna.some(e => e.includes("back-hair---bangs-straight"))) {
    return false;
  }
  return _dna.some(e => e.includes("back-hair---bangs-straight")) && _dna.some(e => e.includes("jewelry-forehead") && !e.includes("none"));
};

// no long bangs and 1001 earrings
const is1001EarringsWithLongBangs = ( _dna = []) => {
  if(!_dna.some(e => e.includes("back-hair---long-bangs"))) {
    return false;
  }
  return _dna.some(e => e.includes("back-hair---long-bangs")) && _dna.some(e => e.includes("earrings") && e.includes("numbers"));
};

// no double wagmi
const isWagmiEarringsWithWagmiNecklace = ( _dna = []) => {
  if(!_dna.some(e => e.includes("earrings---wagmi"))) {
    return false;
  }
  return _dna.some(e => e.includes("earrings---wagmi")) && _dna.some(e => e.includes("jewelry-neck---wagmi"));
};

// no other headpiece with eth
const isEthWithHeadpiece = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-face---forehead-crystal"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-face---forehead-crystal")) && (_dna.some(e => e.includes("jewelry-face---circlet")) || _dna.some(e => e.includes("jewelry-face---lotus")) || _dna.some(e => e.includes("jewelry-face---tiara")));
};

// no straight bangs with eth
const isEthWithStraigthBangs = ( _dna = []) => {
  if(!_dna.some(e => e.includes("jewelry-face---forehead-crystal"))) {
    return false;
  }
  return _dna.some(e => e.includes("jewelry-face---forehead-crystal")) && _dna.some(e => e.includes("front-hair---bangs-straight"));
};

// rules
const rules = ( _dna = []) => {
    return hairColorsMatch(_dna) &&
      !areLongBangsWithVeilJewelry(_dna) &&
      isHijabWithSolidVeil(_dna) &&
      isHijabWithBaseFull(_dna) &&
      !isHijabWithJewelryForehead(_dna) &&
      !isHijabWithEarrings(_dna) &&
      isHijabWithSimpleClothing(_dna) &&
      !isHijabWithBandana(_dna) &&
      !isGlassesMoreThanOne(_dna) &&
      isLongBangsWithStraigthWavy(_dna) &&
      !is1001EarringsWithLongBangs(_dna) &&
      !isShavedWithJewelryForehead(_dna) &&
      !isShavedWithJewelryFace(_dna) &&
      !isRuffleTurtleneckWithJewelryNeckCollar(_dna) &&
      !isSnakeBitesWithFullSmile(_dna) &&
      !isPushedBackWithLooseCurls(_dna) &&
      !isMessyBangsWithJBackHairVariants(_dna) &&
      !isBlackEarringsWitBlackLongBangs(_dna) &&
      !isEthWithHeadpiece(_dna) &&
      !isEthWithStraigthBangs(_dna) &&
      !isWagmiEarringsWithWagmiNecklace(_dna) &&
      backHairSolidVeilExistsAndApplyRules(_dna) &&
      foreheadVeilExistsAndApplyRules(_dna) &&
      !areLongBangsWithNaturalBlackHair(_dna) &&
      !areJewelrySnakeBitesWithFullMouthRedHazelnut(_dna) &&
      isShavedHeadWithBackHair(_dna) &&
      !isEarringsWithJewelryForeheadVeil(_dna) &&
      !isJewelryFaceWithJewelryForehead(_dna) &&
      !isShavedHeadWithBandana(_dna) &&
      !isNecklaceWagmiAndNecklaceRibbon(_dna) &&
      !isNecklaceCollarAndBlank(_dna) &&
      !isNecklaceRibbonAndBlank(_dna) &&
      !isJewelryNeckWithSimpleTurtleneck(_dna) &&
      !isForeheadJewelryWithStraightBangs(_dna) &&
      isDarkBaseWithCornrowsOrSmallBraids(_dna) &&
      cornrowsExistsAndApplyRules(_dna) &&
      naturalBlackExistsAndApplyRules(_dna) &&
      choppyExistsAndApplyRules(_dna) &&
      smallBraidsExistsAndApplyRules(_dna) &&
      babyCurlsExistsAndApplyRules(_dna) &&
      choppyPixieExistsAndApplyRules(_dna) &&
      tattooExistsAndApplyRules(_dna) &&
      baseSpiceExistsAndApplyRules(_dna) &&
      !isLongBangsWithWagmi(_dna) &&
      !isPigtailsWitForehead(_dna) &&
      !isBandanaWithForehead(_dna);
}
  module.exports = { rules }