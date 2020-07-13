# Pseudocode for ./BasicBot.ts
## Get move
for each possible move:
  get the eval for that move and remember it
return the move with the best eval
  
      
## Get evaluation
if board is losing:
  return that
otherwise:
  for each possible opponent move:
    if that move is losing:
      remember that the move is losing
      look at the next possible one 
    else:
      there is a non-losing move, and tell that to the outer loop
  if computer doesn't have a non-losing move:
    remember this move is winning
  otherwise:
    remember this move as a non-losing one
return the eval, based on the best move remembered