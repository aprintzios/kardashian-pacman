>First how am I going to represent the game area in the DOM?
>>I will divide the game area into squares where each square can hold either 1 wall, 1 gem, kim, or one of the kanyes

>Setting up the game board
>> Before I start on the game logic, I will first get the game board set up in the HTML
>> I first determined how many rows and columns of squares I wanted (since I wanted a landscape view my # columns was greater than rows)
>> Then I determined where I wanted my walls to go using xy coordinates and stored these values in an array called wallMap 
>>> For example: [[1,1], [1,2],[1,3]........[9,9]]
>> Then I created a gemMap with xy coordinates of the gems (essentially the opposite of the wallMap because the gems filled all the spaces with no wall)
>>Then I put kim in her position at the top left of the screen (square[0,0])
>>I created one kanye and put him on the other side of the screen

>Handling game events
>>Next I had to think of how the game will actually handle game play
>>I knew I had to have an event listener for the arrow keys which would control kim's movements
>>I would also need an interval timer to make the kanyes move every x seconds
>>I would need to handle collisions between kim and the gems as well as kim and the kanyes

>Kim's movement
>>I set up an event listener for the arrow keys and depending on which arrow key was pressed I would move kim by one square (if there was a wall in the way Kim just wouldn't move)

>Kanye movement
>>I found the minimum path between kanye's current location and kim's current location
>>Each time the function was called with the interval timer, kanye would take one step on the path towards kim

>Kim/Gem collision
>>Every time kim moved to a new square, I would check to see if there was a gem in that square.
>>If there was, I could remove that square from the gemMap and play a bling sound effect
>>if the gemMap array is empty, go to gameOver function

>Kim/Kanye collision
>> every time I would move a kanye I would check if they were moving into a square that kim was in
>> if they were moving into a kim square I would call the gameOver function

>gameOver function
>>if there was a kim/kanye collision display the lose message
>>if the gemMap array was empty display the goToNextLevel message


>Once I got all that working I added more kanyes and added audio and graphics