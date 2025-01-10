import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AssetsHandlerService {
    private readonly s3Client = new S3Client({ 
        region: this.configService.getOrThrow('AWS_S3_REGION')
     });
    constructor(private readonly configService: ConfigService) {}

    async uploadAsset(fileName: string, file: Buffer) {
        new PutObjectCommand({
            Bucket: '3DModels',
            Key: fileName,
            Body: file
        });
    }
}