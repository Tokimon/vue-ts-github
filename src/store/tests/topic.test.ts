import { topic, setTopic } from '../topic';

describe('store/topic', () => {
  describe('.setTopic', () => {
    it('Sets the "topic" value', () => {
      setTopic('test');
      expect(topic.value).toBe('test');
    });
  });
});