angular
  .module('walletApp')
  .controller('SfoxTradeDetailsController', SfoxTradeDetailsController);

function SfoxTradeDetailsController ($scope, MyWallet, Exchange, currency, sfox) {
  let trade = $scope.trade;
  let format = currency.formatCurrencyForView;
  let fiat = currency.currencies.find((c) => c.code === 'USD');
  let tx = MyWallet.wallet.txList.transactions(0).find((t) => t.hash === trade.txHash);
  if (!tx) { tx = MyWallet.wallet.txList.transactions()[0]; }

  $scope.classHelper = Exchange.classHelper;

  $scope.tradeId = trade.id;
  $scope.tradeAccount = sfox.accounts[0];
  $scope.namespace = 'SFOX';
  $scope.state = '.' + trade.state;
  $scope.type = trade.isBuy ? '.buy' : '.sell';
  $scope.tradeDetails = sfox.sellTradeDetails(null, null, trade, tx);
  $scope.rate = format(1 / (trade.sendAmount / 1e8) * (trade.receiveAmount + trade.feeAmount), fiat, true);
}
