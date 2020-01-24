import { fetchBills } from '../services/billsService';

describe('fetchBills()', () => {
  it('should catch a thrown error if the response is not healthy ', async () => {
    const mockErrorText = 'fetchBills has thrown an error due to an unhealthy response'
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return {
        ok: false,
        status: 400,
        statusText: mockErrorText
      }
    });
    try {
      await fetchBills()
    } catch (error) {
      expect(error).toEqual(mockErrorText)
    }
  })
});