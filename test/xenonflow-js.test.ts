import { JobService } from '../src/xenonflow-js'

/**
 * Dummy test
 */
describe('Instantiation test', () => {
  it('JobService is instantiable', () => {
    expect(new JobService()).toBeInstanceOf(JobService)
  })
})
