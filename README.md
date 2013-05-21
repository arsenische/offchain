offchain
========

Small project for handling some offchain bitcoin signed data.

All entities (asset, asset owner) are identified by bitcoin addresses.

Format of asset transfers:

    {datetime} SEND {amount} OF {asset} TO {recipient} {sender's signature}

* `datetime` - unique ISO timestamp, e. g. 2013-05-19T20:13:38.999Z
* `amount` - integer > 0
* `asset` - bitcoin address that identifies asset
* `recipient` - bitcoin address of asset recipient; if `recipient` = `asset`, then this transfer is share destruction.
* `sender's signature` - sender's bitcoin signature of `{datetime} SEND {amount} OF {asset} TO {recipient}` string; if `sender` = `asset`, then this transfer is share creation.

Example data (list of transfers):

    2013-05-21T03:41:53.900Z SEND 100 OF 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v TO 1Ey1aR39VbaQKpkRSpydW7DrvhbGGbhBuj HNCW2/hWiE+sV3MEzFu+lDguMCumeiKwm5iHWeHWqkFLQNQLyFNm88BqvQyicH0j1qdsB8DKRCP6bYtWG//rkgk=
    2013-05-21T03:44:13.406Z SEND 10 OF 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v TO 1XufNRo2a317o6xn17yuSYT7khy6jF8nM G4iyJiXTKHj9UXrFcduTPy1Ow7+bgnS1bkWcdzmnrPDXiR0708skbn3qYx4WcTjBNfi/s9mddUrNYg5wv2L4KXI=
    2013-05-21T03:46:12.998Z SEND 1 OF 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v TO 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v HJiOIP+B0YIYV6YN/ryGFC+uVpwmaImBPizCyIhg8RCWtwihvLec+fl8zgHm44hEKbiRU7G8A72CIo4tBFIX8/s=

In this example 
  1. Issuer sends (=creates) 100 shares of 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v to 1Ey1aR39VbaQKpkRSpydW7DrvhbGGbhBuj
  2. 1Ey1aR39VbaQKpkRSpydW7DrvhbGGbhBuj sends 10 shares to 1XufNRo2a317o6xn17yuSYT7khy6jF8nM 
  3. 1Ey1aR39VbaQKpkRSpydW7DrvhbGGbhBuj destroys 1 share sending it to 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v

If you process this data, you will get the following results:

    ASSET: 13TDWsU8L5vYQci43muTRiWMAqnanQHg9v
    1Ey1aR39VbaQKpkRSpydW7DrvhbGGbhBuj OWNS 89
    1XufNRo2a317o6xn17yuSYT7khy6jF8nM OWNS 10

Demo: http://arsenische.github.io/offchain/index.html

Thanks: brainwallet.org, http://twitter.github.io/bootstrap/, http://jquery.com/, github