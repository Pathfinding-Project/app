const U="data:application/octet-stream;base64,eyJpZCI6Ik11T3N3TjlBejNtUlRlTTJvcHlOOCIsIm5hbWUiOiJWYXJpYWJsZXMgUmVmZXJlbmNlIiwiZGVzY3JpcHRpb24iOiJTaW1wbGUgZGVtbyBvZiB2YXJpYWJsZXMgYXZhaWxhYmxlIGluIGV4cHJlc3Npb25zLiIsImF1dGhvciI6ImdpdGh1YjpwYXRoLXZpc3VhbGlzZXIiLCJzY3JlZW5zaG90cyI6WyJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80QUFRU2taSlJnQUJBUUFBQVFBQkFBRC8yd0NFQUFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFmL0FBQkVJQUVBQVFBTUJFUUFDRVFFREVRSC94QUdpQUFBQkJRRUJBUUVCQVFBQUFBQUFBQUFBQVFJREJBVUdCd2dKQ2dzUUFBSUJBd01DQkFNRkJRUUVBQUFCZlFFQ0F3QUVFUVVTSVRGQkJoTlJZUWNpY1JReWdaR2hDQ05Dc2NFVlV0SHdKRE5pY29JSkNoWVhHQmthSlNZbktDa3FORFUyTnpnNU9rTkVSVVpIU0VsS1UxUlZWbGRZV1ZwalpHVm1aMmhwYW5OMGRYWjNlSGw2ZzRTRmhvZUlpWXFTazVTVmxwZVltWnFpbzZTbHBxZW9xYXF5czdTMXRyZTR1YnJDdzhURnhzZkl5Y3JTMDlUVjF0ZlkyZHJoNHVQazVlYm42T25xOGZMejlQWDI5L2o1K2dFQUF3RUJBUUVCQVFFQkFRQUFBQUFBQUFFQ0F3UUZCZ2NJQ1FvTEVRQUNBUUlFQkFNRUJ3VUVCQUFCQW5jQUFRSURFUVFGSVRFR0VrRlJCMkZ4RXlJeWdRZ1VRcEdoc2NFSkl6TlM4QlZpY3RFS0ZpUTA0U1h4RnhnWkdpWW5LQ2txTlRZM09EazZRMFJGUmtkSVNVcFRWRlZXVjFoWldtTmtaV1puYUdscWMzUjFkbmQ0ZVhxQ2c0U0Zob2VJaVlxU2s1U1ZscGVZbVpxaW82U2xwcWVvcWFxeXM3UzF0cmU0dWJyQ3c4VEZ4c2ZJeWNyUzA5VFYxdGZZMmRyaTQrVGw1dWZvNmVyeTgvVDE5dmY0K2ZyLzJnQU1Bd0VBQWhFREVRQS9BUDRsNjlBNXdvQUtBQ2dBb0FLQUNnQW9BS0FDZ0FvQUtBQ2dBb0FLQUNnQW9BS0FDZ0FvQUtBQ2dBb0FLQUwybWFiZDZ2ZlcybTJLd3ZkM2JtT0ZiaTd0TEdFc0VaejVsM2ZUMjFwQW9WR08rZWVOT01ic2tBZ0hWbjRjZUxCRmZUUGI2UEhGcHN0eEJlUEw0czhKeExITmFlYjlwamo4elhFKzBQQ1laRmNXM25ZY0tneTdvckFFai9EUHhkR3lJOXZvYXRKYVNYOGU3eGg0T0FlMGpFSmFaRy90N2F3eFBHVlVFdklCSjVhdDVFM2xnRFI4TnZGakxLNndhSXl3MjhsMU15K0wvQjdDT0dKL0xrTDQxMDdYV1Q1UEtQNzR2OG9RdHhRQS93RDRWbDR2eElmczJpZ1JJcnRueGY0UEc1SHRoZGd4WjE3OS9pRWtQNVBtR09kSmJWOXQxRkxDZ0JuNjM0RzhSK0hiZDduVm90S2hSRXRaR2p0dkV2aHJVcm9SM29EV3Nvc2ROMWU3dlRGS3BWeEt0dVVXTjQ1SFpVa1JtQU9Sb0FLQU5IU05ZMVhRTlN0TlkwVFVMelN0VnNKRE5aYWhZVHlXMTVheWxHak1rRThUTEpHNVIzVGNyQTdXSTZFMW5WcFU2MU9WS3RDTlNuTlduQ2FVb3lWNzJsRjZOWFNlcGxXbzBjUlNuUnIwNFZxTlJXblRxUlVvVFYwN1NpN3BxNlRzK3g2STN4eStNYmZlK0ozamRzZE4zaUxVamo4NTY5SEo4eHgvRDlPdFJ5UEY0akthV0luR3JYcDRDcExEUXJWSVI1WXpxUnBPS2xLTWZkVGQybG9lTFc0VjRieERqS3ZrZVYxWEZXaTU0T2pKcFBXeWJodGM4L24xM1dicWVhNXVkVHZwN2k0bGtubm1sdUpIbG1tbWN5U3l5T3pGbmtrZG1kMkpKWmlTVGsxeTFLazZ0U2RXck9WU3BWbktwVW5OdVVwem5KeW5PVW5xNVNrMjIzcTIyejNLZE9GS25DbFNoR25UcFFqVHB3Z2xHTUlRaW93aEdLMFVZeFNTUzBTU1JGL2EycC84L3dCZGY5L24vd0FhZ3NQN1cxUC9BSi9yci92OC93RGpRQWYydHFmL0FEL1hYL2Y1L3dER2dBL3RiVS8rZjY2LzcvUC9BSTBBVXBKSkpuYVNWMmtrYzVaM0pabU9NWkpQSk9CUUF5Z0FvQUtBQ2dBb0FLQUNnQW9BS0FDZ0FvQUtBQ2dBb0FLQUNnQW9BS0FDZ0FvQUtBQ2dBb0FLQVA4QS85az0iXSwic2l6ZSI6NzUyODIsImxhc3RNb2RpZmllZCI6MTcxNDU1NDkwNDIzMn0=";export{U as default};