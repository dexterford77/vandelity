- display portfolio as of current date
  - constructed using all of the historical transactions on or prior to that date
- "Cash" is always in the table to represent your current cash balance.
- clicking "trade" link takes user to "Trade" panel; pre-populates symbol & date for that stock
- ensure that each value is properly calculated
  - "Current Value" == quantity * current price
  - "Cost Basis" === all the money you've spent to buy a particular stock so far
    - (total money spent to purchase a stock) - (total money earned by selling it upto that point)
  - "Profit/Loss" == current value - cost basis
  - "1d / 7d / 30d" == change in stock's price between today and the price on the first day of each of those time periods, e.g. 30 days ago

- aggregated statistics table (the upper table in the mockup) calculates values for the entire portfolio
  - be careful to properly handle stocks which currently have no quantity but where the user has bought and sold previously, thus earning a profit or loss on them before the currently selected date!
  - The best way to value a portfolio is to add up the value of all the trades that created it (plus whatever cash you started with). You will have to recalculate this any time the "current date" changes.

- Play with your app! Make sure everything updates correctly in real-time (e.g. when the date is changed or a stock is traded) and that edge cases are properly handled.


