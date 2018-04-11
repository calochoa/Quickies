
export const getGradientColor = (type)=> {
  gradientColor = ['#4C669f', '#0276C9', '#192F6A'];
  if (type === 'Bananas Mode') {
    gradientColor = ['#5C4C42', '#9A8478', '#1E130C'];
  } else if (type === 'Beast Mode') {
		gradientColor = ['#500503', '#870000', '#190A05'];
  } else if (type === 'Boss Mode') {
		gradientColor = ['#222222', '#434343', '#000000'];
  } else if (type === 'Blah Mode') {
		gradientColor = ['#75818C', '#bdc3c7', '#2C3E50'];
  } else if (type === 'default' || type === 'Standard') {
		gradientColor = ['#4C669f', '#0276C9', '#192F6A'];
  } else if  (type === 'default2') {
		gradientColor = ['#02111D', '#037BB5', '#02111D'];
  }
	return gradientColor
}

