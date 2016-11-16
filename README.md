# Mu Puzzle

In the book *Gödel Escher Bach* by Douglas Hofstadter, the author begins by framing the MU puzzle, a classic example of a [post canonical system](https://en.wikipedia.org/wiki/Post_canonical_system).

**Given the string "MI", is it possible to form the string "MU" given the following rules?**

1. If the string ends with "I": append a "U" and add that string to the collection.
2. If you have "Mx", where "x" is any pattern, add "Mxx" to the collection.
3. If "III" occurs in your collection, replace it with "U" and add that string to the collection.
4. If "UU" occurs in your collection, delete it and add that string to the collection.

<details> 
  <summary>**Spoiler**</summary>
  The answer to this question is *no*.
  
  To solve this problem, examine the number of "I"s in any given string. Note that three consecutive "I"s can be removed, so it's helpful to think of the number of "I"s modulo 3.
  
  The initial number of "I"s (mod 3) is 1. The final number of "I"s (mod 3) is 0. The doubling operation is the only operation that increases the number of "I"s.
  
  Hence:
  
  ![here](https://wikimedia.org/api/rest_v1/media/math/render/svg/9f495144b9679fad1c9ba9df88b7a430cc554929)
  
  Therefore there is no solution.
  
</details>
