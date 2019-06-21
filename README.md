# S3 Upload lambda
A brief example that receives a file from form data as multipart and uploads it to *S3*
## Setup instructions

### Local terminal
```
$ npm install
```
### AWS Console

**Lambda** | Create your Lambda

**API Gateway** | Enable **Use Lambda Proxy integration** when attaching the Lambda to an endpoint

**API Gateway** | Add _multipart/form-data_ as **Binary Media Types** inside *Api > Settings*

## Configure AWS CLI
[Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

```
$ aws configure
```
Input your *aws_access_key*, *aws_secret_access_key* & *aws_session_token* and make sure you set the region to *us-east-1*
[AWS CLI Configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)


## Upload Lambda code
```
$ zip -X -r ./lambda-archive.zip *
$ aws lambda update-function-code --function-name FUNCTION_NAME --zip-file fileb://lambda-archive.zip
$ rm ./lambda-archive.zip
```
*Replace **FUNCTION_NAME** with the actual Lambda name*
