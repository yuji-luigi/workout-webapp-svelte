const exerciseImages = [
	'https://i.ytimg.com/vi/N5MV0qWn6eg/maxresdefault.jpg',
	'https://previews.123rf.com/images/pjphotography/pjphotography1506/pjphotography150600038/41521338-beautiful-young-sporty-sexy-couple-workout-in-gym.jpg',
	'https://thumbs.dreamstime.com/b/sporty-sexy-couple-showing-muscle-workout-gym-muscular-man-wowan-men-148692820.jpg',
	'https://previews.123rf.com/images/pjphotography/pjphotography1506/pjphotography150600038/41521338-beautiful-young-sporty-sexy-couple-workout-in-gym.jpg',
	'https://images.unsplash.com/photo-1483721310020-03333e577078?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D',
	'https://heidipowell.net/wp-content/uploads/2010/04/Hamstring-Raises-29_preview.jpeg',
	'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=pexels-victorfreitas-841130.jpg&fm=jpg',
	'https://hips.hearstapps.com/hmg-prod/images/young-muscular-build-athlete-exercising-strength-in-royalty-free-image-1706546541.jpg?crop=0.668xw:1.00xh;0.107xw,0&resize=640:*',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc4v5UsNc87rCnFMncwylcnL5RidTF8gNEMg&s',
	'https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg',
	'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-08/shy-girl-workout-tiktok-mc-230828-02-ab104e.jpg',
	'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/02/Full-body-workout-training-program.jpg?fit=2208%2C1474&ssl=1',
	'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuXxvE1WqREEJKIrRjUZjnD-koZS3Brd1rGCx2L88klLfQpJS9ZEG0Syms9N4Av2ayLa4&usqp=CAU'
];

export function createRandomImage() {
	const randomIndex = Math.floor(Math.random() * exerciseImages.length);
	return exerciseImages[randomIndex];
}
