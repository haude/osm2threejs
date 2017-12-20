FROM ruby
MAINTAINER old guy from the team

WORKDIR /app

COPY Gemfile /app
COPY Gemfile.lock /app
RUN bundle install
COPY . /app
CMD ['/app/bootstrap.sh']
