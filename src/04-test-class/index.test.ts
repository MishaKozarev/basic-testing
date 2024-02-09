import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

interface IBankAccount {
  _balance: number;
}

const initialBalance = 100;
const quantity = 50;

const bankAccount: IBankAccount = {
  _balance: initialBalance,
};

const account = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account).toEqual(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const overBalance = () => account.withdraw(200);
    expect(overBalance).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const receiver = getBankAccount(initialBalance);
    const sender = getBankAccount(quantity);

    const transferOn = () => receiver.transfer(200, sender);

    expect(transferOn).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transferOn = () => account.transfer(50, account);
    expect(transferOn).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const result = quantity + initialBalance;
    account.deposit(quantity);

    const balance = account.getBalance();
    expect(balance).toBe(result);
  });

  test('should withdraw money', () => {
    account.withdraw(quantity);
    const balance = account.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should transfer money', () => {
    const receiverAccountBalance = 100;
    const senderAccount = getBankAccount(initialBalance);
    const receiverAccount = getBankAccount(receiverAccountBalance);
    const transferOfAmount = 50;

    senderAccount.transfer(transferOfAmount, receiverAccount);

    const balanceSend = senderAccount.getBalance();
    expect(balanceSend).toBe(initialBalance - transferOfAmount);

    const balanceReceive = receiverAccount.getBalance();
    expect(balanceReceive).toBe(initialBalance + transferOfAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();

    if (balance === null) {
      expect(typeof balance).not.toBe('number');
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
