require "html-proofer"

task :build do
  puts "Running jekyll buil"
  sh "bundle exec jekyll build"
end

task :test do
  options = {
    assume_extension: true,
    internal_domains: [
      "developers.shipcloud.io"
    ],
    typhoeus: {
      ssl_verifypeer: false,
      headers: {
        "User-Agent" => "Mozilla/5.0 (compatible; developers.shipcloud.io htmlproofer) Chrome/87.0.4280.88"
      }
    },
    url_ignore: [
      "https://requestbin.com",
      "https://www.ups.com/media/de/service_guide_de_preview.pdf",
      "https://www.dhl.de/en/paket/information/geschaeftskunden/service-wunschzeit.html",
      "https://us7.campaign-archive.com/home/?u=61172dea8790607c71d26bb86&id=4319f24b6f",
      "http://john-sheehan.com/blog/ultimate-api-webhook-backend-service-debugging-testing-monitoring-and-discovery-tools-list",
    ]
  }
  HTMLProofer.check_directory("./_site", options).run
end
