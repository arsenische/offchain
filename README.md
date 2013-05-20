offchain
========

Small project for handling some offchain bitcoin signed data.

All entities (asset, asset owner) are identified by bitcoin addresses.

Format of asset transfers:

    {datetime} SEND {amount} OF {asset} TO {recepient} {sender's signature}

* `datetime` - unique ISO timestamp, e. g. 2013-05-19T20:13:38.999Z
* `amount` - integer > 0
* `asset` - bitcoin address that identifies asset
* `recepient` - bitcoin address of asset recepient; if `recepient` = `asset`, then this transfer is share destruction.
* `sender's signature` - sender's bitcoin signature of `{datetime} SEND {amount} OF {asset} TO {recepient}` string; if `sender` = `asset`, then this transfer is share creation.

Demo: http://arsenische.github.io/offchain/index.html

Thanks: brainwallet.org, http://twitter.github.io/bootstrap/, http://jquery.com/, github