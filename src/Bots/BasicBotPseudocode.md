# Pseudocode for ./BasicBot.ts
## Get move
for each possible move:
  get the eval for that move and remember it
return the move with the best eval
  
      
## Get evaluation
if board is losing:
  return that
otherwise:
  if computer doesn't have a non-losing move:
    remember this move is winning
  otherwise:
    remember this move as a non-losing one
return the eval, based on the best move remembered