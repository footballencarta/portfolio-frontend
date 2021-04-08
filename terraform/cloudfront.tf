resource "aws_s3_bucket" "dw_portfolio_frontend" {
  bucket = "dw-portfolio-frontend"
  acl    = "private"
}

resource "aws_s3_bucket_policy" "dw_bucket" {
  bucket = aws_s3_bucket.dw_portfolio_frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "CloudFront"
    Statement = [
      {
        Sid       = "Allow CloudFront Access"
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.default.iam_arn
        }
        Action    = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.dw_portfolio_frontend.arn}/*"
        ]
      },
    ]
  })
}

resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "Cloudfront S3 User"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.dw_portfolio_frontend.bucket_regional_domain_name
    origin_id   = "website"
    origin_path = "/portfolio-frontend"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = aws_s3_bucket.dw_portfolio_frontend.bucket_regional_domain_name
    origin_id   = "css"
    origin_path = "/css"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = keys(var.domains)

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "website"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "css"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    path_pattern = "*.css"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "css"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    path_pattern = "*.ttf"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "css"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    path_pattern = "*.woff"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "css"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    path_pattern = "*.woff2"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  ordered_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "css"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    path_pattern = "assets/main_bg.png"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.domain_cert.arn
    ssl_support_method  = "sni-only"
  }
}
