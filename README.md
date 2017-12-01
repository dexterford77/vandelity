- make it possible to sell yr stocks
  - make sure proper quantity (even 0) displays for date of sale + after

- calculate positions + overview using only stock data on or prior to current date

- scenarios:
  - 10/1/2017
    - buy 10 AAPL 
  - 10/2/2017
    - stock value decreases; you've lost money
    - sell 10 AAPL
    - Cash Available increases by 10 x AAPL price
  - 10/3/2017
    - AAPL Quantity == 0
    - AAPL Cost Basis == 10 x price on 10/1/2017
    - AAPL Current Value == 0
    - AAPL Profit/Loss == whatever profit/loss was on date quantity was reduced to 0

  - if trade in the future would become impossible by trade you're trying to make in past, notify that user's action will cause any invalidated trades to be deleted
