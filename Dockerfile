FROM ruby
MAINTAINER old guy from the team

WORKDIR /app

COPY Gemfile /app
COPY Gemfile.lock /app
ENV BUNDLE_PATH /bundle_path

ADD . /app

CMD ["shotgun","--server=webrick","--port=4567","--host=0.0.0.0", "--env=production","web.rb"]
