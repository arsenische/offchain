function validate_transfers(asset_info)
{
  var asset = asset_info.asset;
  var owns = asset_info.owners;
  var transfers = asset_info.transfers;

  var prev_timestamp = "2013-01-01T00:00:00.000Z";

  for (var i=0; i<transfers.length; i++)
  {
    if ( (transfers[i]=="") || (transfers[i]=="\n") )
      continue;

//    console.debug(i);
    transfer = parse_transfer(transfers[i]);
    //console.debug(transfer);

    if (!transfer)
      return {error:"Failed to parse transfer at line "+i};

    if (parts[0] <= prev_timestamp)
      return {error:"Invalid timestamp sequence at line "+i};
    else
      prev_timestamp = parts[0];

    if (!asset)
      asset = transfer.asset;

    if (asset != transfer.asset)
      return {error:"Invalid asset at line "+i};

    if ((transfer.amount <= 0) || isNaN(transfer.amount))
      return {error:"Invalid amount at line "+i};

    if ( ((owns[transfer.from]==undefined) || (owns[transfer.from] < transfer.amount)) && (transfer.from != asset) )
      return {error:transfer.from + " doesn't have " + transfer.amount + " at line "+i};

    owns[transfer.from] -= transfer.amount;

    if (owns[transfer.to]==undefined)
      owns[transfer.to] = transfer.amount;
    else
      owns[transfer.to] += transfer.amount;
  }
  delete owns[asset];
  return {asset:asset, owners:owns};
}

function parse_transfer(transfer)
{
  // <ISO datetime> SEND <amount> OF <asset> TO <recipient> <sender's signature>
  parts = transfer.split(/ /);
  if (parts.length == 8)
  {
    var sig = parts[7];
    var msg = transfer.substring(0,transfer.length - sig.length - 1);
//    console.debug(sig);
//    console.debug(msg);
    var sender = verify_message(sig,msg);
    return {timestamp:parts[0],amount:Math.floor(parts[2]),asset:parts[4],from:sender,to:parts[6],signature:sig};    
  }
  else
    return false;
}