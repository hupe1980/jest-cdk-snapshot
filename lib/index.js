"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const jest_snapshot_1 = require("jest-snapshot");
exports.toMatchCdkSnapshot = function (received) {
    const matcher = jest_snapshot_1.toMatchSnapshot.bind(this);
    return matcher(convertStack(received));
};
const convertStack = (stack) => {
    stack.node.prepareTree();
    const errors = stack.node.validateTree();
    if (errors.length > 0) {
        throw new Error(`Stack validation failed:\n${errors
            .map(e => `${e.message} at: ${e.source.node.scope}`)
            .join('\n')}`);
    }
    const sstack = {
        name: stack.name,
        template: stack.toCloudFormation(),
        metadata: {},
        environment: {
            name: 'test',
            account: 'test',
            region: 'test'
        }
    };
    const stackInspector = new assert_1.StackInspector(sstack);
    return stackInspector.value;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBaUQ7QUFFakQsaURBQWdEO0FBVW5DLFFBQUEsa0JBQWtCLEdBQXVCLFVBQ3BELFFBQWU7SUFFZixNQUFNLE9BQU8sR0FBRywrQkFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO0lBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFekIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkJBQTZCLE1BQU07YUFDaEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNoQixDQUFDO0tBQ0g7SUFFRCxNQUFNLE1BQU0sR0FBRztRQUNiLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtRQUNoQixRQUFRLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFO1FBQ2xDLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLE1BQU0sRUFBRSxNQUFNO1NBQ2Y7S0FDRixDQUFDO0lBRUYsTUFBTSxjQUFjLEdBQUcsSUFBSSx1QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWxELE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQztBQUM5QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFja0luc3BlY3RvciB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJ0Bhd3MtY2RrL2Nkayc7XG5pbXBvcnQgeyB0b01hdGNoU25hcHNob3QgfSBmcm9tICdqZXN0LXNuYXBzaG90JztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBuYW1lc3BhY2UgamVzdCB7XG4gICAgaW50ZXJmYWNlIE1hdGNoZXJzPFI+IHtcbiAgICAgIHRvTWF0Y2hDZGtTbmFwc2hvdCgpOiBSO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9NYXRjaENka1NuYXBzaG90OiBqZXN0LkN1c3RvbU1hdGNoZXIgPSBmdW5jdGlvbihcbiAgcmVjZWl2ZWQ6IFN0YWNrXG4pIHtcbiAgY29uc3QgbWF0Y2hlciA9IHRvTWF0Y2hTbmFwc2hvdC5iaW5kKHRoaXMpO1xuICByZXR1cm4gbWF0Y2hlcihjb252ZXJ0U3RhY2socmVjZWl2ZWQpKTtcbn07XG5cbmNvbnN0IGNvbnZlcnRTdGFjayA9IChzdGFjazogU3RhY2spID0+IHtcbiAgc3RhY2subm9kZS5wcmVwYXJlVHJlZSgpO1xuXG4gIGNvbnN0IGVycm9ycyA9IHN0YWNrLm5vZGUudmFsaWRhdGVUcmVlKCk7XG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBTdGFjayB2YWxpZGF0aW9uIGZhaWxlZDpcXG4ke2Vycm9yc1xuICAgICAgICAubWFwKGUgPT4gYCR7ZS5tZXNzYWdlfSBhdDogJHtlLnNvdXJjZS5ub2RlLnNjb3BlfWApXG4gICAgICAgIC5qb2luKCdcXG4nKX1gXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHNzdGFjayA9IHtcbiAgICBuYW1lOiBzdGFjay5uYW1lLFxuICAgIHRlbXBsYXRlOiBzdGFjay50b0Nsb3VkRm9ybWF0aW9uKCksXG4gICAgbWV0YWRhdGE6IHt9LFxuICAgIGVudmlyb25tZW50OiB7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICBhY2NvdW50OiAndGVzdCcsXG4gICAgICByZWdpb246ICd0ZXN0J1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdGFja0luc3BlY3RvciA9IG5ldyBTdGFja0luc3BlY3Rvcihzc3RhY2spO1xuXG4gIHJldHVybiBzdGFja0luc3BlY3Rvci52YWx1ZTtcbn07XG4iXX0=