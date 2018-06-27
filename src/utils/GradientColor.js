
export const getGradientColor = (type)=> {
  gradientColor = ['#4C669f', '#0276C9', '#192F6A'];
  if (type === 'Bananas Mode' || type === 'Beast Mode' 
      || type === 'Boss Mode' || type === 'Blah Mode'
      || type === 'Standard' || type === 'default'
      || type === 'Header'
    ) {
    gradientColor = ['#2C3E50', '#3C7080', '#4CA1AF'];
    //gradientColor = ['#434343', '#434343', '#000000'];
  } else if (type === 'QuickiesHeader' || type === 'BodySplitsFooter'
      || type === 'OfTheDayHeader' || type === 'OfTheDayFooter'
      || type === 'WeekHeader' || type === 'WeekFooter'
      || type === 'WorkoutsHeader' || type === 'ExercisesHeader'
    ) {
    gradientColor = ['#2C3E50', '#2C3E50', '#2C3E50'];
    //gradientColor = ['#000000', '#000000', '#000000'];
  }/*else if  (type === 'default2') {
		gradientColor = ['#02111D', '#037BB5', '#02111D'];
  } else if (type === 'Bananas Mode Old') {
    gradientColor = ['#5C4C42', '#9A8478', '#1E130C'];
  } else if (type === 'Beast Mode Old') {
    gradientColor = ['#500503', '#870000', '#190A05'];
  } else if (type === 'Boss Mode Old') {
    gradientColor = ['#222222', '#434343', '#000000'];
  } else if (type === 'Blah Mode Old') {
    gradientColor = ['#75818C', '#bdc3c7', '#2C3E50'];
  }*/
	return gradientColor
}

